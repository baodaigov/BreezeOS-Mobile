import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface phoneState {
    active: boolean
    name: string
    image: any
    number: string | null
    color: string | null
}

const initialState: phoneState = {
    active: false,
    name: '',
    image: null,
    number: null,
    color: null
}

const phone = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setImage: (state, action: PayloadAction<any>) => {
            state.image = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string | null>) => {
            state.number = action.payload;
        },
        setColor: (state, action: PayloadAction<string | null>) => {
            state.color = action.payload;
        }
    }
});

export const { setActive, setName, setImage, setPhoneNumber, setColor } = phone.actions;

export default phone.reducer;