import { createSlice } from "@reduxjs/toolkit";

const ubicationSlice = createSlice({
    name: "ubication",
    initialState: {
        ubiety: []
    }, 
    reducers: {
        setUbication: (state, action) => {
            state.ubiety = action.payload;
        },
    },
});

export const { setUbication } = ubicationSlice.actions;
export default ubicationSlice.reducer;
