import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface phoneState {
    name: string
    image: any
    number: string
    color: string | null
}

const initialState: phoneState = {
    name: '',
    image: null,
    number: '',
    color: null
}

const phone = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setImage: (state, action: PayloadAction<any>) => {
            state.image = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.number = action.payload;
        },
        setColor: (state, action: PayloadAction<string | null>) => {
            state.color = action.payload;
        }
    }
});

export const { setName, setImage, setPhoneNumber, setColor } = phone.actions;

export default phone.reducer;