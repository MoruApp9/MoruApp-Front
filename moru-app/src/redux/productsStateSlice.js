import { createSlice } from "@reduxjs/toolkit"

const productsStateSlice = createSlice({
  name: "productsState",
  initialState: [],
  reducers: {
    setProductsState: (state, action) => {
      const newItem = action.payload
      const existingItem = state.find(item => item.id === newItem.id)
      !existingItem && state.push(newItem)
    },
    cleanProductsState: () => []
  },
})

export const { setProductsState, cleanProductsState } = productsStateSlice.actions
export default productsStateSlice.reducer