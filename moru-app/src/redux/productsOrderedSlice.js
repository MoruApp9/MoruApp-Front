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
    cleanProductsOrderedFromStore: () => []
  },
})

export const { setProductsOrderedToStore, cleanProductsOrderedFromStore } = productsOrderedSlice.actions
export default productsOrderedSlice.reducer