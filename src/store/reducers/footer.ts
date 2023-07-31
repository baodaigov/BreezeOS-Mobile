import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface footerState {
    active: boolean
}

const initialState: footerState = {
    active: true
}

const footerSlice = createSlice({
    name: 'footer',
    initialState,
    reducers: {
        setFooterActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        }
    }
});

export const { setFooterActive } = footerSlice.actions;

export default footerSlice.reducer;