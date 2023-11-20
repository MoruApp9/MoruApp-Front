import { createSlice } from "@reduxjs/toolkit"

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addFav: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.find(item => item.id === newItem.id);
            if (!existingItem) state.push(newItem)
        },
        removeFav: (state, action) => {
            const idToRemove = action.payload
            return state.filter(item => item.id !== idToRemove)
        }
    }
})


export const { addFav, removeFav } = favoritesSlice.actions

export default favoritesSlice.reducer