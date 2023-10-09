import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import user from './userSlice'
import products from "./productSlice";
import productsFiltered from "./productsFilteredSlice";
import favorites from "./favoritesSlice";
import isFav from "./isFavSlice";
import cartSlice from "./cartSlice";
import categoriesReducer from './categoriesSlice';
import errors from './errorsSlice'
import allProducts from "./allProductsSlice";


export default configureStore({
    reducer: {
        user: user,
        products: products,
        allProducts: allProducts,
        cart: cartSlice,
        productsFiltered,
        favorites: favorites,
        categories: categoriesReducer,
        isFav: isFav,
        errors: errors
    },
    applyMiddleware: [thunk],
})

