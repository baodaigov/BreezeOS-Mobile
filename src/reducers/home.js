import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHome: true,
    footer: {
        home: null
    }
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setHome: (state, action) => {
            state.isHome = action.payload;
        },
    }
});

export const { setHome } = homeSlice.actions;

export default homeSlice.reducer;