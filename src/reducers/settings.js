import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    volume: 100,
    brightness: 100,
    wifi: true,
    bluetooth: false,
    airplaneMode: false,
    darkMode: true,
    nightShift: false,
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
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setBrightness: (state, action) => {
            state.brightness = action.payload;
        },
        setWifi: (state, action) => {
            state.wifi = action.payload;
        },
        setAirplaneMode: (state, action) => {
            state.airplaneMode = action.payload;
            if(action.payload === true){
                state.wifi = false
            } else {
                state.wifi = true
            }
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
        setNightShift: (state, action) => {
            state.nightShift = action.payload;
        },
        setBluetooth: (state, action) => {
            state.bluetooth = action.payload;
        },
        setBoldText: (state, action) => {
            state.boldText = action.payload;
        },
        setBatteryLevel: (state, action) => {
            state.battery.level = action.payload;
        },
        setBatteryCharging: (state, action) => {
            state.battery.charging = action.payload;
        },
        toggleBatterySaver: (state, action) => {
            state.battery.batterySaver = action.payload;
        },
    }
});

export const { setVolume, setBrightness, setWifi, setAirplaneMode, setDarkMode, setNightShift, setBluetooth, setBoldText, setBatteryLevel, setBatteryCharging, toggleBatterySaver } = settingsSlice.actions;

export default settingsSlice.reducer;