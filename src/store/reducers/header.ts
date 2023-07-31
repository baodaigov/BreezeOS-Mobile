import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface headerState {
    active: boolean,
    style: string,
    displayMenu: boolean
}

const initialState: headerState = {
    active: true,
    style: 'text-gray-100',
    displayMenu: false
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        setStyle: (state, action: PayloadAction<string>) => {
            state.style = action.payload;
        },
        setDisplayMenu: (state, action: PayloadAction<boolean>) => {
            state.displayMenu = action.payload;
        }
    }
});

export const { setHeaderActive, setStyle, setDisplayMenu } = headerSlice.actions;

export default headerSlice.reducer;