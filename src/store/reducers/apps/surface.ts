import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface phoneState {
  url: string;
  searchEngine: string;
}

const initialState: phoneState = {
  url: "",
  searchEngine: "Bing"
};

const phone = createSlice({
  name: "surface",
  initialState,
  reducers: {
    openUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setSearchEngine: (state, action: PayloadAction<string>) => {
      state.searchEngine = action.payload;
    },
  },
});

export const { openUrl, setSearchEngine } = phone.actions;

export default phone.reducer;
