import  io  from "../app.js";
import { Order } from "../models/orders.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



export const socketListener = () =>{

    io.on("connection" , async (socket)=>{

        // after page refresh this will get the user the order details
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        // All Orders
        const orders = await Order.find({
            orderStatus:  { $in: ["Pending", "Accepted"] },
            createdAt: { $gte: today }
            // add here payment = success when in prod
        }).select("orderName customerName createdAt quantity orderStatus")
      
      
        const ordersWithAMPM = orders.map(order => {
          const createdAtAMPM = order.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          return { 
              ...order._doc,
              createdAt: createdAtAMPM 
          };
        });
      
        // Distinct Order Names
        
        const distinctOrders = await Order.distinct("orderName" , {
          orderStatus: { $in: ["Pending", "Accepted"] },
          createdAt: { $gte: today }
        })
      
        const orderData = {
          ordersWithAMPM,
          distinctOrders
        }


        io.emit("allOrders", orderData);
    
        try {
            console.log(`Socket connected: ${socket.id}`);


            socket.on("disconnect", () => {
              console.log(`Socket disconnected: ${socket.id}`);
            })
    
        } catch (error) {
            console.error("Socket connection error:", error);
        } 
    
    })


}


const acceptOrder = asyncHandler(async(req,res)=>{
       
    const {orderId} = req.body

    if(!orderId){
        throw new ApiError(400, "Please provide Order ID")
    }

    const order = await Order.findById(orderId)

    if(!order){
        throw new ApiError(404, "Order not found")
    }

    order.orderStatus = "Accepted"

    await order.save()

    return res
    .status(200)
    .json(new ApiResponse(200, "Order accepted successfully"))

})

const confirmOrder = asyncHandler(async(req,res)=>{
   
     const {otp , orderId} = req.body

     if(!otp || !orderId){
         throw new ApiError(400, "Please provide OTP and Order ID")
     }

     const order = await Order.findById(orderId)

     if(!order){
         throw new ApiError(404, "Order not found")
     }
    
     if(order.OTP !== otp){
         throw new ApiError(400, "Invalid OTP")
     }

    order.orderStatus = "Completed"

    await order.save()

    return res
    .status(200)
    .json(new ApiResponse(200, "Order confirmed successfully"))
     

})




export {confirmOrder,acceptOrder}