import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import products from "./productSlice";
import favorites from "./favoritesSlice";
import cartSlice from "./cartSlice";

export default configureStore({
    reducer: {
        user: user,
        products: products,
        favorites: favorites,
        cart: cartSlice
        //episodes: episodes, 
    }
})

