import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface FoodState {
    food: any[];
    loading: boolean;
}

const initialState: FoodState = {
    food: [],
    loading: false,
}

export const listFoodItems = createAsyncThunk(
    'food/listFoodItems',
    async function() {
        try {
            const response = await axios.get('http://localhost:8090/api/v1/menu/listMenu');
            return response.data;
        } catch (error) {
            console.log(error);
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
                state.loading = false;
                state.food = action.payload?.data;
            });
    }
});

export default foodSlice.reducer;
