import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    powermenu: {
        active: false,
        modalType: ''
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalType: (state, action) => {
            state.powermenu.modalType = action.payload;
        },
        displayPowerMenu: (state, action) => {
            state.powermenu.active = action.payload;
            if(action.payload === true){
                state.powermenu.modalType = 'default'
            } else {
                state.powermenu.modalType = ''
            }
        },
    }
});

export const { displayPowerMenu, setModalType } = modalSlice.actions;

export default modalSlice.reducer;