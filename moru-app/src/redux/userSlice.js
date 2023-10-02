

// import { createSlice } from "@reduxjs/toolkit"

// export const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         characters: [],
//     },
//     reducer: {
//         getAllUsers: (state, action) => {
//             state.user = action.payload
//         }
//     }
// })


// export const { getAllUsers } = userSlice.actions

// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {userRole: 'adminCommerce'},  // dejar esto como obj vacío
    reducers: {
        setUser: (state, action) => action.payload 
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
