import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: true,
    theme: 'dark'
}

const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyboardActive: (state, action) => {
            state.active = action.payload;
        },
        setKeyboardTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { setKeyboardActive, setKeyboardTheme } = keyboardSlice.actions;

export default keyboardSlice.reducer;