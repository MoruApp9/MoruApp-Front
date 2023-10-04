import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removefromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        },
        removeAllFromCart: (state) => {
            state.cart = [] 
        }
    }
})

export default cartSlice.reducer;
export const { addToCart, removefromCart, removeAllFromCart } = cartSlice.actions