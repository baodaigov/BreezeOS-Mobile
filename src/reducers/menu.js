import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuActive: (state, action) => {
            state.active = action.payload;
        }
    }
});

export const { setMenuActive } = menuSlice.actions;

export default menuSlice.reducer;