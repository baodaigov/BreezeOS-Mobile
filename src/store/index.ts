import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import footerReducer from './reducers/footer';
import globalReducer from './reducers/global';
import headerReducer from './reducers/header';
import keyboardReducer from './reducers/keyboard';
import menuReducer from './reducers/menu';
import modalReducer from './reducers/modal';
import panelReducer from './reducers/panel';
import settingsReducer from './reducers/settings';
import phoneReducer from './reducers/apps/phone';

const reducers = {
    footer: footerReducer,
    global: globalReducer,
    header: headerReducer,
    keyboard: keyboardReducer,
    menu: menuReducer,
    modal: modalReducer,
    panel: panelReducer,
    settings: settingsReducer,

    // apps
    phone: phoneReducer,
}

const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch