import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import products from "./productSlice";
import productsFiltered from "./productsFilteredSlice";

export default configureStore({
    reducer: {
        user: user,
        products: products,
        productsFiltered,
        //episodes: episodes, 
    }
})

