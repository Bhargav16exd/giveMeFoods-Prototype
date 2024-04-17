import { configureStore } from "@reduxjs/toolkit";
import foodSlices from "./slices/foodSlices";
import authSlices from "./slices/authSlices";



const store = configureStore({
    reducer: {
        listFood:foodSlices,
        authenticationDetails:authSlices
    },

});

export default store;