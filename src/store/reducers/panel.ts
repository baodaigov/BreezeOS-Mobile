import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface panelState {
    active: boolean
}

const initialState: panelState = {
    active: false
}

const panelSlice = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        setPanelActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        }
    }
});

export const { setPanelActive } = panelSlice.actions;

export default panelSlice.reducer;