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
    },
    batterynotfound: {
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
        displayBatteryNotFoundMenu: (state, action) => {
            state.batterynotfound.active = action.payload;
        },
    }
});

export const { displayPowerMenu, displayPlatformMenu, displayLowBatteryMenu, displayBatteryNotFoundMenu } = modalSlice.actions;

export default modalSlice.reducer;