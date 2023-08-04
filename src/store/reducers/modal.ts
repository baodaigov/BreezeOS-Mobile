import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
    powermenu: {
        active: boolean,
        emergencyMode: boolean
    },
    lowbattery: {
        active: boolean,
    },
    batterynotfound: {
        active: boolean
    }
}

const initialState: modalState = {
    powermenu: {
        active: false,
        emergencyMode: false
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
        displayPowerMenu: (state, action: PayloadAction<boolean>) => {
            state.powermenu.active = action.payload;
        },
        toggleEmergencyMode: (state, action: PayloadAction<boolean>) => {
            state.powermenu.emergencyMode = action.payload;
        },
        displayLowBatteryMenu: (state, action: PayloadAction<boolean>) => {
            state.lowbattery.active = action.payload;
        },
        displayBatteryNotFoundMenu: (state, action: PayloadAction<boolean>) => {
            state.batterynotfound.active = action.payload;
        },
    }
});

export const { displayPowerMenu, toggleEmergencyMode, displayLowBatteryMenu, displayBatteryNotFoundMenu } = modalSlice.actions;

export default modalSlice.reducer;