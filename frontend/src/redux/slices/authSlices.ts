import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface authState {
    loggedInStatus:any,
    token:string,
    data:any
}


const initialState: authState = {
    loggedInStatus: localStorage.getItem("loggedInStatus") || false ,
    token: localStorage.getItem("token") || '',
    data:  localStorage.getItem("data")  || {}
};


export const handleLoginFunction:any = createAsyncThunk(
    'auth/login',
    async function(data:any){
        try {
            const response = await axios.post('http://localhost:8010/api/v1/admin/login',data)
            return response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
)


const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(handleLoginFunction.fulfilled , (state,action)=>{
            localStorage.setItem("data",JSON.stringify(action.payload?.data))
            localStorage.setItem("token",action.payload?.data?.token)
            localStorage.setItem("loggedInStatus",JSON.stringify(true))
            state.data = action.payload?.data
            state.loggedInStatus = true
            state.token = action.payload?.data?.token
        })
    }
})

export default authSlice.reducer