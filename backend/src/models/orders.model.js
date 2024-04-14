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
    orderIdByMerchant:{
        type: String,
        required: true
    },
    foodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    transactionId:{
        type: String,
        select: false
    },
    transactionStatus:{
        type: String,
        default:"Not Started"
    },
    OTP:{
        type: Number,
        required: true
    },
    orderStatus:{
        type: String,
        default: "Pending"
    },

},
{timestamps: true})

export const Order = mongoose.model("Order", orderSchema)