import { configureStore } from "@reduxjs/toolkit";
import reducer from "./combine/reducer";
import apiMiddleware from "./middlewares/api";
import authMiddleware from "./middlewares/auth";

const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware, apiMiddleware),
   // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
