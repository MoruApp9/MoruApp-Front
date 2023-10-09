import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: false, 
    reducers: {
        setUser: (state, action) => action.payload 
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
