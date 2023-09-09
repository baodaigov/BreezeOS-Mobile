import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface keyboardState {
    active: boolean,
    sound: boolean,
    lang: string[]
}

const initialState: keyboardState = {
    active: true,
    sound: true,
    lang: [
        'English (US)',
        'Tiếng Việt'
    ]
}

const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyboardActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        setKeyboardSound: (state, action: PayloadAction<boolean>) => {
            state.sound = action.payload;
        },
    }
});

export const { setKeyboardActive, setKeyboardSound } = keyboardSlice.actions;

export default keyboardSlice.reducer;