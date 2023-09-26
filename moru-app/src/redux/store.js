import { configureStore } from "@reduxjs/toolkit";
import user from './characterSlice'

export default configureStore({
    reducer: {
        user: user,
        //episodes: episodes,
    }
})