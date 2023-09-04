import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface headerState {
    active: boolean,
    switchStyle: boolean,
    displayMenu: boolean
}

const initialState: headerState = {
    active: true,
    switchStyle: false,
    displayMenu: false
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        switchStyle: (state, action: PayloadAction<boolean>) => {
            state.switchStyle = action.payload;
        },
        setDisplayMenu: (state, action: PayloadAction<boolean>) => {
            state.displayMenu = action.payload;
        }
    }
});

export const { setHeaderActive, switchStyle, setDisplayMenu } = headerSlice.actions;

export default headerSlice.reducer;