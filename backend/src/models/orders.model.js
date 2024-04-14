import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    phoneNo:{
        type: Number,
        required: true
    },
    foodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    transactionId:{
        type: String,
        required: true,
        select: false
    },
    transactionStatus:{
        type: String,
        required: true
    },
    OTP:{
        type: Number,
        required: true
    },
    orderStatus:{
        type: String,
        required: true
    },

},
{timestamps: true})