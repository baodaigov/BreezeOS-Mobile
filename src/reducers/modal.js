import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    powermenu: {
        active: false
    },
    platform: {
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
        displayPlatformMenu: (state, action) => {
            state.platform.active = action.payload;
        },
    }
});

export const { displayPowerMenu, displayPlatformMenu } = modalSlice.actions;

export default modalSlice.reducer;