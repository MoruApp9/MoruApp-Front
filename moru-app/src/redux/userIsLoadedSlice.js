import { createSlice } from "@reduxjs/toolkit";

const userIsLoadedSlice = createSlice({
    name: "userIsLoaded",
    initialState: false, 
    reducers: {
        setUserIsLoaded: (state, action) => action.payload 
    },
});

export const { setUserIsLoaded } = userIsLoadedSlice.actions;
export default userIsLoadedSlice.reducer;
