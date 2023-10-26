import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Wallpaper1 from "@/images/default.jpg";

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
      icon: "https://raw.githubusercontent.com/breezeos/icons/main/breezeos-mobile/icons/phone.svg",
      id: "phone",
    },
    {
      name: "Calendar",
      icon: `https://raw.githubusercontent.com/breezeos/icons/main/breezeos-mobile/icons/calendar/calendar-${new Date().getDate()}.svg`,
      id: "calendar",
    },
    {
      name: "Photos",
      icon: "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/master/src/scalable/apps/accessories-image-viewer.svg",
      id: "photos",
    },
    {
      name: "Surface",
      icon: "https://raw.githubusercontent.com/breezeos/icons/main/breezeos-mobile/icons/surface.svg",
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
