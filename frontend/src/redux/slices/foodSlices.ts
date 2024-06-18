import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendAPI from "../../constant";
import { toast } from "sonner";



interface FoodState {
    food: any[];
    category: any[];
    loading: boolean;
    orderStatus:any;
    foodById:any[]
}

const initialState: FoodState = {
    food: [],
    category: [],
    loading: false,
    orderStatus : {},
    foodById:[]

}

export const listFoodItems = createAsyncThunk(
    'food/listFoodItems',
    async function() {
        try {
            const response = axios.get(`${backendAPI}/api/v1/menu/listMenu`);

            toast.promise(response,{
                loading: 'Loading...'
            })
            
            return  (await response).data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }
);

export const getFoodItemOnIDs = createAsyncThunk(
    'foo/getFoodOnId',
    async function(ids:any) {
       console.log("IDS recived in slice",ids)
        try {
            const response = await axios.post(`${backendAPI}/api/v1/menu/foodList`,ids);
            return response.data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }
)

export const checkOrderStatus:any = createAsyncThunk(
    'food/checkStatus',
    async function (id){
        console.log(id)
        try {
            const response = await axios.get(`${backendAPI}/api/v1/menu/checkStatus/${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }
)


export const buyFoodItem:any = createAsyncThunk(
    'food/buyFoodItem',
    async function(data: any) {
        try {
            const response = axios.post(`${backendAPI}/api/v1/payment/pay`, data);
            toast.promise(response,{
                loading: 'redirecting...'
            })
            return (await response).data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }
);

const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listFoodItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(listFoodItems.fulfilled, (state, action: PayloadAction<any>) => {
                console.log(action.payload?.data.category);
                state.loading = false;
                state.food = action.payload?.data?.food;
                state.category = action.payload?.data?.category;
                console.log(state.food)
            })
            .addCase(checkOrderStatus.fulfilled,(state,action: PayloadAction<any>)=>{
                state.orderStatus = action.payload?.data
                console.log(state.orderStatus)
            })
            .addCase(getFoodItemOnIDs.fulfilled,(state,action:PayloadAction<any>)=>{
                state.foodById = action.payload?.data
            })
    }
});

export default foodSlice.reducer;
