import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import userIsLoaded from "./userIsLoadedSlice"
import products from "./productSlice"
import productsFiltered from "./productsFilteredSlice"
import favorites from "./favoritesSlice"
import isFav from "./isFavSlice"
import cartSlice from "./cartSlice"
import categoriesReducer from "./categoriesSlice"
import errors from "./errorsSlice"
import allProducts from "./allProductsSlice"
import ubication from "./ubicationSlice"

export default configureStore({
  reducer: {
    userIsLoaded: userIsLoaded, // Este no se ocupa
    products: products,
    allProducts: allProducts,
    cart: cartSlice,
    productsFiltered,
    favorites: favorites,
    categories: categoriesReducer,
    isFav: isFav,
    errors: errors,
    ubication: ubication,
  },
  applyMiddleware: [thunk],
})
