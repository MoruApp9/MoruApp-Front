import {
    createSlice
} from "@reduxjs/toolkit";

const userRoleSlice = createSlice({
    name: "userRole",
    initialState: "buyer", 
    reducers: {
        setUserRole: (state, action) => {
            return action.payload; 
        },
    },
});

export const {
    setUserRole
} = userRoleSlice.actions;
export default userRoleSlice.reducer;