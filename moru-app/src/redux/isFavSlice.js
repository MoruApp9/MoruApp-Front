//Este lo voy a cambiar por un estado local
import { createSlice } from "@reduxjs/toolkit";

const isFavSlice = createSlice({
  name: "isFav",
  initialState: {},
  reducers: {
    setIsFav: (state, action) => {
      state[action.payload.productId] = action.payload.isFav;
    },
  },
});

export const { setIsFav } = isFavSlice.actions;

export default isFavSlice.reducer;
