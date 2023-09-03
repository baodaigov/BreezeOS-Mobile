import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface phoneState {
  url: string;
}

const initialState: phoneState = {
  url: "",
};

const phone = createSlice({
  name: "surface",
  initialState,
  reducers: {
    openUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { openUrl } = phone.actions;

export default phone.reducer;
