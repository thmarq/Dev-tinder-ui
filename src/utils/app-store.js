import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user-slice';
import feedReducer from './feed-slice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed : feedReducer
    }
})
export default appStore;