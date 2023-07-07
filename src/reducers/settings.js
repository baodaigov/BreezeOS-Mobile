import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    volume: 100,
    brightness: 100
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
        }
    }
});

export const { setVolume, setBrightness } = settingsSlice.actions;

export default settingsSlice.reducer;