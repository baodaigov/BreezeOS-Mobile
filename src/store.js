import { configureStore } from "@reduxjs/toolkit";
import headerReducer from './reducers/header';
import homeReducer from './reducers/home';
import panelReducer from './reducers/panel';
import settingsReducer from './reducers/settings';

export const store = configureStore({
    reducer: {
        header: headerReducer,
        home: homeReducer,
        panel: panelReducer,
        settings: settingsReducer
    }
})