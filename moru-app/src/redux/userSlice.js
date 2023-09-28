

import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        characters: [],
    },
    reducer: {
        getAllUsers: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { getAllUsers } = userSlice.actions

export default userSlice.reducer 