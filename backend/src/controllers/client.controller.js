import { ApiError } from "../utils/ApiError.js";
import { Food } from "../models/food.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import axios from "axios";
import mongoose from "mongoose";
import { Order } from "../models/orders.model.js";
import sha256 from "sha256";
import io from "../app.js";



const MERCHANT_ID = "PGTESTPAYUAT";
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const APP_BE_URL = "http://localhost:8090";

// Pay to PhonePay API

// This api will get order details
// This api sends server to server call to phonepay server for payment processing
// A payment gateway will open in the browser
// After payment is done, phonepay will send a callback to the server

const payToPhonePay = asyncHandler(async (req, res) => {
  // Starting a transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  const { name, price, phoneNo, foodId } = req.body;

  if (!name || !price || !phoneNo || !foodId) {
    throw new ApiError(400, "Please provide all the details");
  }

  const food = await Food.findById(foodId);

  if (!food) {
    throw new ApiError(404, "Food not found");
  }

  const merchantTransactionIdByUs = Math.floor(Math.random() * 100000000000);
  

  // Creating a payload to send to phonepe

  const payload = {
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: "MUID123",
    amount: price * 100,
    redirectUrl:`${APP_BE_URL}/api/v1/payment/statusAPI/MT7850590068188104`,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const bufferObj = Buffer.from(JSON.stringify(payload), "utf-8");
  const base64EncodedPayLoad = bufferObj.toString("base64");

  const string = base64EncodedPayLoad + "/pg/v1/pay" + SALT_KEY;
  const sha256Value = sha256(string);
  const xVerify = sha256Value + "###" + SALT_INDEX;

 

  const options = {
    method: "post",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY":xVerify
    },
    data: {
        request: base64EncodedPayLoad
    },
  };


   await Order.create({
    name,
    quantity: 1,
    price,
    phoneNo,
    foodId,
    transactionId:"MT7850590068188104",
    OTP: Math.floor(Math.random() * 10000),
  });

           
  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      session.commitTransaction()
      res.send(response.data.data.instrumentResponse.redirectInfo)
    })
    .catch(function (error) {
      session.abortTransaction()
      console.error(error);
    });
});

// check payment status

const checkPayment = asyncHandler(async(req,res)=>{

    const merchantTransactionId = req.params?.transactionId


    if(!merchantTransactionId){
        throw new ApiError(400,"No order found")
    }

    const orders = await Order.findOne({transactionId:merchantTransactionId})

    if(!orders){
      throw new ApiError(500,"Internal Server Error")
    }


    const xVerify = sha256(`/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`+ SALT_KEY )+ "###"+ SALT_INDEX


    const options = {
        method: 'get',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
              accept: 'application/json',
              'Content-Type':'application/json',
              'X-MERCHANT-ID':'PGTESTPAYUAT',
              'X-VERIFY':xVerify
             }
      };


      axios
        .request(options)
        .then(async function (response) {
            console.log(response.data);
            if(response.data?.code == 'PAYMENT_SUCCESS' ){
              orders.transactionStatus = "SUCCESS"
              await orders.save()
              console.log("Order status updated successfully");
              await Emitter()
              return res.redirect("http://localhost:5173/payment/success")
            }
            else if(response.data?.code == 'PAYMENT_ERROR'){
              orders.transactionStatus = "FAILED"
              await orders.save()
              return res.redirect("http://localhost:5173/payment/failed")
            }
        })
        .catch(function (error) {
          console.error(error);
        });  



})

async function Emitter(){
  console.log("Emitter called")
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const orders = await Order.find({
      orderStatus: "Pending",
      createdAt: { $gte: today },
  }).select("name phoneNo foodId orderStatus");

  io.emit("allOrders", orders);
}


export { payToPhonePay , checkPayment };
