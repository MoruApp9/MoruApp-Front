import { createSlice } from "@reduxjs/toolkit"

const productsOrderedFilteredSlice = createSlice({
  name: "productsOrderedFiltered",
  initialState: [],
  reducers: {
    setProductsOrderedFilteredToStore: (state, action) =>  action.payload,
    //setFilteredProducts: (state, action) => state = action.payload,
    cleanProductsOrderedFilteredFromStore: () => []
  },
})

export const { setProductsOrderedFilteredToStore, cleanProductsOrderedFilteredFromStore } = productsOrderedFilteredSlice.actions
export default productsOrderedFilteredSlice.reducer