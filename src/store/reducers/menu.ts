import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface menuState {
    active: boolean
}

const initialState: menuState = {
    active: false
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        }
    }
});

export const { setMenuActive } = menuSlice.actions;

export default menuSlice.reducer;