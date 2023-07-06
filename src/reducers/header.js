import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    style: 'text-gray-100'
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setStyle: (state, action) => {
            state.style = action.payload;
        }
    }
});

export const { setStyle } = headerSlice.actions;

export default headerSlice.reducer;