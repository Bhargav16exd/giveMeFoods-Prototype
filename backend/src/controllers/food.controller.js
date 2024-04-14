import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Food } from "../models/food.model.js";


// Admins Options ONLY
const addFoodToMenu = asyncHandler(async(req,res)=>{

    // Picture Uploading is pending need to fix it 

    const {name , picture, price} = req.body

    if(!name || !price){
        throw new ApiError(400,"Please provide all the required fields")
    }

    const food = await Food.create({
        name,
        picture,
        price
    }) 

    await food.save()

    return res
    .status(201)
    .json(new ApiResponse(201, "Food added successfully", food))

})

const deleteFoodFromMenu = asyncHandler(async(req,res)=>{

    const {id} = req.params

    if(!id){
        throw new ApiError(400,"Please provide all the required fields")
    }

    const food = await Food.findById(id)

    if(!food){
        throw new ApiError(404,"Food not found")
    }

    await Food.findByIdAndDelete(id)

    return res
    .status(200)
    .json(new ApiResponse(200, "Food deleted successfully", food))

})


const updateFoodMenu = asyncHandler(async(req,res)=>{

    const {id} = req.params
    const {name, picture, price} = req.body

    if(!id || !name || !price){
        throw new ApiError(400,"Please provide all the required fields")
    }

    const food = await Food.findById(id)

    if(!food){
        throw new ApiError(404,"Food not found")
    }

    food.name = name
    food.picture = picture
    food.price = price

    await food.save()

    return res
    .status(200)
    .json(new ApiResponse(200, "Food updated successfully", food))

})


// Accessible to all users
const getFoodMenu = asyncHandler(async(req,res)=>{

    const food = await Food.find({})

    return res
    .status(200)
    .json(new ApiResponse(200, "Food Menu", food))

})


export {addFoodToMenu, deleteFoodFromMenu, updateFoodMenu, getFoodMenu} 