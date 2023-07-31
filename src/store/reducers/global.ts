import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Wallpaper1 from '../../images/default.jpg';

interface globalState {
    wallpaper: any
    isLocked: boolean,
    isBlank: boolean,
    recentTasks: {
        active: boolean
    },
    screenSplash: boolean,
    apps: {
        name: string,
        icon: string,
        type: string,
        payload: boolean
    }[]
}

const initialState: globalState = {
    wallpaper: Wallpaper1,
    isLocked: true,
    isBlank: false,
    recentTasks: {
        active: false
    },
    screenSplash: false,
    apps: [
        {
            name: 'Firefox',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg',
            type: 'keyboard/setKeyboardActive',
            payload: true
        }
    ]
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setWallpaper: (state, action: PayloadAction<string>) => {
            state.wallpaper = action.payload;
        },
        setLocked: (state, action: PayloadAction<boolean>) => {
            state.isLocked = action.payload;
        },
        setBlank: (state, action: PayloadAction<boolean>) => {
            state.isBlank = action.payload;
        },
        openRecentTasks: (state, action: PayloadAction<boolean>) => {
            state.recentTasks.active = action.payload;
        },
        displayScreenSplash: (state, action: PayloadAction<boolean>) => {
            state.screenSplash = action.payload;
        },
        setDefault: state => {
            state.isLocked = true;
        },
    }
});

export const { setWallpaper, setLocked, setBlank, openRecentTasks, displayScreenSplash, setDefault } = globalSlice.actions;

export default globalSlice.reducer;