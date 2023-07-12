import { createSlice } from "@reduxjs/toolkit";
import Wallpaper1 from '../images/default.jpg';

const initialState = {
    wallpaper: Wallpaper1,
    isLocked: true,
    isBlank: false,
    screenSplash: false,
    apps: [
        {
            name: 'Firefox',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg'
        },
        {
            name: 'Calendar',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg'
        },
        {
            name: 'Settings',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/applications-system.svg'
        },
        {
            name: 'Clock',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg'
        },
        {
            name: 'Camera',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg'
        },
        {
            name: 'Files',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'
        },
        {
            name: 'Calculator',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg'
        },
        {
            name: 'Text Editor',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg'
        },
        {
            name: 'Terminal',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg'
        },
        {
            name: 'Software Store',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/software-store.svg'
        },
        {
            name: 'Thunderbird',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/internet-mail.svg'
        },
        {
            name: 'GitHub Mobile',
            icon: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg'
        }
    ]
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setWallpaper: (state, action) => {
            state.wallpaper = action.payload;
        },
        setLocked: (state, action) => {
            state.isLocked = action.payload;
        },
        setBlank: (state, action) => {
            state.isBlank = action.payload;
        },
        displayScreenSplash: (state, action) => {
            state.screenSplash = action.payload;
        },
        setDefault: state => {
            state.isLocked = true;
        },
    }
});

export const { setWallpaper, setLocked, setBlank, displayScreenSplash, setDefault } = globalSlice.actions;

export default globalSlice.reducer;