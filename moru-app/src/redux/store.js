import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import products from "./productSlice";
import productsFiltered from "./productsFilteredSlice";
import cartSlice from "./cartSlice";

export default configureStore({
    reducer: {
        user: user,
        products: products,
        cart: cartSlice,
        productsFiltered,
        //episodes: episodes, 
    }
})

