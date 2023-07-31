import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface settingsState {
    volume: any,
    brightness: any,
    wifi: boolean,
    bluetooth: boolean,
    airplaneMode: boolean,
    darkMode: boolean,
    nightShift: {
        active: boolean,
        level: number
    },
    boldText: boolean,
    battery: {
        level: any,
        charging: boolean,
        batterySaver: boolean
    }
}

const initialState: settingsState = {
    volume: 100,
    brightness: 100,
    wifi: true,
    bluetooth: false,
    airplaneMode: false,
    darkMode: true,
    nightShift: {
        active: false,
        level: 0.15,
    },
    boldText: false,
    battery: {
        level: null,
        charging: false,
        batterySaver: false
    }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<any>) => {
            state.volume = action.payload;
        },
        setBrightness: (state, action: PayloadAction<any>) => {
            state.brightness = action.payload;
        },
        setWifi: (state, action: PayloadAction<boolean>) => {
            state.wifi = action.payload;
        },
        setAirplaneMode: (state, action: PayloadAction<boolean>) => {
            state.airplaneMode = action.payload;
            if(action.payload === true){
                state.wifi = false
            } else {
                state.wifi = true
            }
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        setNightShiftActive: (state, action: PayloadAction<boolean>) => {
            state.nightShift.active = action.payload;
        },
        setNightShiftLevel: (state, action: PayloadAction<number>) => {
            state.nightShift.level = action.payload;
        },
        setBluetooth: (state, action: PayloadAction<boolean>) => {
            state.bluetooth = action.payload;
        },
        setBoldText: (state, action: PayloadAction<boolean>) => {
            state.boldText = action.payload;
        },
        setBatteryLevel: (state, action: PayloadAction<any>) => {
            state.battery.level = action.payload;
        },
        setBatteryCharging: (state, action: PayloadAction<boolean>) => {
            state.battery.charging = action.payload;
        },
        toggleBatterySaver: (state, action: PayloadAction<boolean>) => {
            state.battery.batterySaver = action.payload;
        },
    }
});

export const { setVolume, setBrightness, setWifi, setAirplaneMode, setDarkMode, setNightShiftActive, setNightShiftLevel, setBluetooth, setBoldText, setBatteryLevel, setBatteryCharging, toggleBatterySaver } = settingsSlice.actions;

export default settingsSlice.reducer;