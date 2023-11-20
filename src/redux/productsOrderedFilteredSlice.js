import { createSlice } from "@reduxjs/toolkit"

const productsOrderedFilteredSlice = createSlice({
  name: "productsOrderedFiltered",
  initialState: [],
  reducers: {
    setProductsOrderedFilteredToStore: (state, action) =>  action.payload,
    //setFilteredProducts: (state, action) => state = action.payload,
    cleanProductsOrderedFilteredFromStore: () => [],

    updateStatusFiltered : (state, action) => {
      const productId = action.payload
      const productIndex = state.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        // Establece el status del producto en el valor proporcionado (puede ser null, undefined, etc.)
        //state[productIndex].status = status;
        state.splice(productIndex, 1);
      }
    }
  },
})

export const { updateStatusFiltered, setProductsOrderedFilteredToStore, cleanProductsOrderedFilteredFromStore } = productsOrderedFilteredSlice.actions
export default productsOrderedFilteredSlice.reducer