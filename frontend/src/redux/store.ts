import { configureStore } from "@reduxjs/toolkit";
import foodSlices from "./slices/foodSlices";



const store = configureStore({
    reducer: {
        listFood:foodSlices
    },

});

export default store;