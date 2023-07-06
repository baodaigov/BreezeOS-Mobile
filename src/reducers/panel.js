import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false
}

const panelSlice = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        setPanelActive: (state, action) => {
            state.active = action.payload;
            console.log('wrwelrkewkrwmrklewrt')
        }
    }
});

export const { setPanelActive } = panelSlice.actions;

export default panelSlice.reducer;