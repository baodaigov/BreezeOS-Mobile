import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Wallpaper1 from "../../images/default.jpg";
import Surface from "../../icons/surface.svg";

interface globalState {
  wallpaper: any;
  isHome: boolean;
  isLocked: boolean;
  isBlank: boolean;
  recentTasks: {
    active: boolean;
  };
  apps: {
    name: string;
    icon: string;
    id: string;
  }[];
  activeApp: string;
  menu: {
    active: boolean;
  };
  screenSplash: boolean;
}

const initialState: globalState = {
  wallpaper: Wallpaper1,
  isHome: true,
  isLocked: true,
  isBlank: false,
  recentTasks: {
    active: false,
  },
  apps: [
    {
      name: "Phone",
      icon: "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg",
      id: "phone",
    },
    {
      name: "Surface",
      icon: Surface,
      id: "surface",
    },
  ],
  activeApp: "",
  menu: {
    active: false,
  },
  screenSplash: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setWallpaper: (state, action: PayloadAction<string>) => {
      state.wallpaper = action.payload;
    },
    setHome: (state) => {
      state.isHome = true;
    },
    openApp: (state, action: PayloadAction<string>) => {
      state.isHome = false;
      if (!state.isHome) {
        state.activeApp = action.payload;
      } else {
        state.activeApp = "";
      }
      state.recentTasks.active = false;
    },
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
    setBlank: (state, action: PayloadAction<boolean>) => {
      state.isBlank = action.payload;
    },
    setMenuActive: (state, action: PayloadAction<boolean>) => {
      state.menu.active = action.payload;
    },
    openRecentTasks: (state, action: PayloadAction<boolean>) => {
      state.recentTasks.active = action.payload;
      if (action.payload === true) {
        state.menu.active = false;
      }
    },
    displayScreenSplash: (state, action: PayloadAction<boolean>) => {
      state.screenSplash = action.payload;
    },
    setDefault: (state) => {
      state.isLocked = true;
    },
  },
});

export const {
  setWallpaper,
  setHome,
  openApp,
  setLocked,
  setBlank,
  setMenuActive,
  openRecentTasks,
  displayScreenSplash,
  setDefault,
} = globalSlice.actions;

export default globalSlice.reducer;
