import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritelist: [],
  loading: false,
  error: null,
};

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    getFavoriteListRequest: (state) => {
      state.loading = true;
    },
    getFavoriteListSuccess: (state, action) => {
      state.loading = false;
      state.favoritelist = action.payload;
    },
    getFavoriteListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addItemToFavoriteList: (state, action) => {
      state.favoritelist.push(action.payload);
    },
    removeItemFromFavoriteList: (state, action) => {
      state.favoritelist = state.favoritelist.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure,
  addItemToFavoriteList,
  removeItemFromFavoriteList,
} = favoriteListSlice.actions;

export default favoriteListSlice.reducer;