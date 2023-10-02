import {
    createSlice
} from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categorias: []
    },
    reducers: {
        setCategorias: (state, action) => {
            state.categorias = action.payload;
        },
    },
});

export const {
    setCategorias
} = categoriesSlice.actions;
export default categoriesSlice.reducer;