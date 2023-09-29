import { createSlice } from "@reduxjs/toolkit"

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: []
    },
    reducers: {
        addFav: (state, action) => {
            state.favorites = [...state.favorites, action.payload]
        },
        removeFav: (state, action) =>{
            state.favorites = state.favorites.filter((fav) => fav.id !== action.payload.id)
        }
    }
})


export const { addFav, removeFav } = favoritesSlice.actions

export default favoritesSlice.reducer