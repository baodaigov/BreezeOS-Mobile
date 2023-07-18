import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: true,
    emoji: false
}

const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyboardActive: (state, action) => {
            state.active = action.payload;
            if(action.payload === false){
                state.emoji = false;
            }
        },
        setEmojiKeyboard: (state, action) => {
            state.emoji = action.payload;
        }
    }
});

export const { setKeyboardActive, setEmojiKeyboard } = keyboardSlice.actions;

export default keyboardSlice.reducer;