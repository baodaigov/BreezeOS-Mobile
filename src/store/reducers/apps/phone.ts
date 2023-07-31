import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface phoneState {
    active: boolean
    number: number | string | null
}

const initialState: phoneState = {
    active: false,
    number: null,
}

const phone = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        setPhoneActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<number | string | null>) => {
            state.number = action.payload;
        },
    }
});

export const { setPhoneActive, setPhoneNumber } = phone.actions;

export default phone.reducer;