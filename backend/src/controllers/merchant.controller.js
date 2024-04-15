import  io  from "../app.js";
import { Order } from "../models/orders.model.js";


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

