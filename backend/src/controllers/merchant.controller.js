import  io  from "../app.js";
import { Order } from "../models/orders.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



export const socketListener = () =>{

    io.on("connection" , async (socket)=>{

    
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


export {confirmOrder}