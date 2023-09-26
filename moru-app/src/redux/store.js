import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'

export default configureStore({
    reducer: {
        user: user,
        //episodes: episodes, 
    }
})

