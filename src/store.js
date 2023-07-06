import { configureStore } from "@reduxjs/toolkit";
import batteryReducer from './reducers/battery';
import headerReducer from './reducers/header';
import panelReducer from './reducers/panel';

export const store = configureStore({
    reducer: {
        battery: batteryReducer,
        header: headerReducer,
        panel: panelReducer,
    }
})