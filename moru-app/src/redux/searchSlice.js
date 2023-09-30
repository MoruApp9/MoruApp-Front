import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    searchResults: [],
    loading: false,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setSearchResults,
    setLoading,
    setError
} = searchSlice.actions;
export default searchSlice.reducer;