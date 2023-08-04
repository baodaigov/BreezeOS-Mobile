import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface headerState {
    active: boolean,
    switchStyle: boolean,
    style: string,
    displayMenu: boolean
}

const initialState: headerState = {
    active: true,
    switchStyle: false,
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
        switchStyle: (state, action: PayloadAction<boolean>) => {
            state.switchStyle = action.payload;
            if(action.payload === true){
                state.style = 'text-gray-800'
            } else {
                state.style = 'text-gray-100'
            }
        },
        setDisplayMenu: (state, action: PayloadAction<boolean>) => {
            state.displayMenu = action.payload;
        }
    }
});

export const { setHeaderActive, switchStyle, setDisplayMenu } = headerSlice.actions;

export default headerSlice.reducer;