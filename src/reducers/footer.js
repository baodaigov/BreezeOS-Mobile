import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: true
}

const footerSlice = createSlice({
    name: 'footer',
    initialState,
    reducers: {
        setFooterActive: (state, action) => {
            state.active = action.payload;
        }
    }
});

export const { setFooterActive } = footerSlice.actions;

export default footerSlice.reducer;