import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favoriteListReducer from "./slices/favoriteListSlice";
import commentReducer from "./slices/commentSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favoriteList: favoriteListReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
