import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      //console.log('chart',action.payload);
      const existingItem = state.cart.find((item) => item.id === newItem.id)
      !existingItem && state.cart.push(newItem)
      //state.cart.push(action.payload)
    },
    uploadQuantity: (state, action) => {
        const { productId, quantity } = action.payload
        //console.log(productId, quantity);
        const existingProduct = state.cart.find(product => product.id === productId)
        if (existingProduct) {
          existingProduct.quantity = quantity
        }
      /* const petitionResponse = action.payload

      petitionResponse.forEach((updatedProduct) => {
        const existingProduct = state.cart.find(product => product.id === updatedProduct.productId)
        if (existingProduct) {
          existingProduct.quantity = updatedProduct.quantity
        }
      }) */
    },
    removefromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },
    removeAllFromCart: (state) => {
      state.cart = []
    },
  },
})

export default cartSlice.reducer
export const { addToCart, removefromCart, removeAllFromCart, uploadQuantity } =
  cartSlice.actions
