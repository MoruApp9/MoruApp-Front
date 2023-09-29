import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import products from "./productSlice";
import favorites from "./favoritesSlice";

export default configureStore({
    reducer: {
        user: user,
        products: products,
        favorites: favorites
        //episodes: episodes, 
    }
})

