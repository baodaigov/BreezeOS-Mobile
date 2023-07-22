import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    powermenu: {
        active: false
    },
    platform: {
        active: false
    },
    lowbattery: {
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
        displayLowBatteryMenu: (state, action) => {
            state.lowbattery.active = action.payload;
        },
    }
});

export const { displayPowerMenu, displayPlatformMenu, displayLowBatteryMenu } = modalSlice.actions;

export default modalSlice.reducer;