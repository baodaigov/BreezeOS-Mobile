import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface keyboardState {
    active: boolean,
    emoji: boolean,
    sound: boolean,
    lang: string[]
}

const initialState: keyboardState = {
    active: true,
    emoji: false,
    sound: true,
    lang: [
        'English (US)',
        'Tiếng Việt',
        'Русский'
    ]
}

const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyboardActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
            if(action.payload === false){
                state.emoji = false;
            }
        },
        setEmojiKeyboard: (state, action: PayloadAction<boolean>) => {
            state.emoji = action.payload;
        },
        setKeyboardSound: (state, action: PayloadAction<boolean>) => {
            state.sound = action.payload;
        },
    }
});

export const { setKeyboardActive, setEmojiKeyboard, setKeyboardSound } = keyboardSlice.actions;

export default keyboardSlice.reducer;