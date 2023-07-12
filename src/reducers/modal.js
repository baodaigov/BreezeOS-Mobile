import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    powermenu: {
        active: false
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        displayPowerMenu: (state, action) => {
            state.powermenu.active = action.payload;
        },
    }
});

export const { displayPowerMenu } = modalSlice.actions;

export default modalSlice.reducer;