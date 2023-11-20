import { createSlice } from "@reduxjs/toolkit"

const productsFilteredSlice = createSlice({
  name: "productsFiltered",
  initialState: [],
  reducers: {
    setProductsByName: (state, action) => action.payload,
    cleanProductsFiltered: () => []
  },
})

export const { setProductsByName, cleanProductsFiltered } = productsFilteredSlice.actions
export default productsFilteredSlice.reducer
