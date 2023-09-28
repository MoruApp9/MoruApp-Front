import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import products from "./productSlice";

export default configureStore({
    reducer: {
        user: user,
        products: products
        //episodes: episodes, 
    }
})

