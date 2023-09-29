import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import user from './userSlice'
import products from "./productSlice";
import productsFiltered from "./productsFilteredSlice";
import favorites from "./favoritesSlice";
import cartSlice from "./cartSlice";

export default configureStore({
    reducer: {
        user: user,
        products: products,
        cart: cartSlice,
        productsFiltered,
        favorites: favorites,
        //episodes: episodes, 
    },
    middleware: [thunk],
})

