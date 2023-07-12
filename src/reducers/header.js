import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: true,
    style: 'text-gray-100 transition-all duration-200',
    displayMenu: false
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderActive: (state, action) => {
            state.active = action.payload;
        },
        setStyle: (state, action) => {
            state.style = action.payload;
        },
        setDisplayMenu: (state, action) => {
            state.displayMenu = action.payload;
        }
    }
});

export const { setHeaderActive, setStyle, setDisplayMenu } = headerSlice.actions;

export default headerSlice.reducer;