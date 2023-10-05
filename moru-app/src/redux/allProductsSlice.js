import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    allProducts: []
};

const allProductsSlice = createSlice({
    name: "allProducts",
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
    },
});

export const {
    setAllProducts
} = allProductsSlice.actions;
export default allProductsSlice.reducer;