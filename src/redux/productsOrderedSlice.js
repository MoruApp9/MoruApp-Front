import { createSlice } from "@reduxjs/toolkit"

const productsOrderedSlice = createSlice({
  name: "productsOrdered",
  initialState: [],
  reducers: {
    setProductsOrderedToStore: (state, action) => action.payload
   ,
       /* return action.payload */
      //state.push(newItem);
      /* console.log('newItem', newItem.orderId);

      const existingItemById = state.find(item => item.id === newItem.id); // ve si matchea el id del nuevo producto con un producto ya existente

      
      if (existingItemById) { // si matchea, o sea, si encuentra un producto con el mismo id en el state
        //console.log('existingItemById',existingItemById.id);
        // Verificar si el orderId es diferente
        if (existingItemById.orderId !== newItem.orderId) {
          // Agregar el nuevo objeto a la store
          state.push(newItem);
        }
      } else {
        // Si no existe un objeto con el mismo id, agregar el nuevo objeto a la store
        state.push(newItem);
      } */
    

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