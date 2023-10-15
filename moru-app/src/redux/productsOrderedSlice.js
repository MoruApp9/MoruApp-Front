import { createSlice } from "@reduxjs/toolkit"

const productsOrderedSlice = createSlice({
  name: "productsOrdered",
  initialState: [],
  reducers: {
    setProductsOrderedToStore: (state, action) => {
      const newItem = action.payload
      const existingItem = state.find(item => item.id === newItem.id)
      !existingItem && state.push(newItem)
    },
    cleanProductsOrderedFromStore: () => [],
    updateStatus : (state, action) => {
      const { productId, status } = action.payload;
      const productIndex = state.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        // Establece el status del producto en el valor proporcionado (puede ser null, undefined, etc.)
        state[productIndex].status = status;
      }

    }
  },
})

export const {updateStatus, setProductsOrderedToStore, cleanProductsOrderedFromStore } = productsOrderedSlice.actions
export default productsOrderedSlice.reducer