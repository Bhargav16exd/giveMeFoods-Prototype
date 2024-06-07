import { configureStore } from "@reduxjs/toolkit";
import foodSlices from "./slices/foodSlices";
import authSlices from "./slices/authSlices";
import CartSlice from "./slices/CartSlice";



const store = configureStore({
    reducer: {
        listFood:foodSlices,
        authenticationDetails:authSlices,
        cartData:CartSlice
    },

});

export default store;