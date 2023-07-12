import { configureStore } from "@reduxjs/toolkit";
import footerReducer from './reducers/footer';
import globalReducer from './reducers/global';
import headerReducer from './reducers/header';
import menuReducer from './reducers/menu';
import modalReducer from './reducers/modal';
import panelReducer from './reducers/panel';
import settingsReducer from './reducers/settings';

export const store = configureStore({
    reducer: {
        footer: footerReducer,
        global: globalReducer,
        header: headerReducer,
        menu: menuReducer,
        modal: modalReducer,
        panel: panelReducer,
        settings: settingsReducer
    }
})