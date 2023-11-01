import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favoriteListReducer from "./slices/favoriteListSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favoriteList: favoriteListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;