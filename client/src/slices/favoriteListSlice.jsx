import { createSlice } from "@reduxjs/toolkit";
const favoritelistItemsFromStorage = localStorage.getItem("favoritelistItems");

const initialState = {
  favoritelistItems: favoritelistItemsFromStorage
    ? Array.isArray(JSON.parse(favoritelistItemsFromStorage))
      ? JSON.parse(favoritelistItemsFromStorage)
      : []
    : [],
};
const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addFavoriteList: (state, action) => {
      state.favoritelistItems.push(action.payload);
      localStorage.setItem(
        "favoritelistItems",
        JSON.stringify(state.favoritelistItems)
      );
    },
    removeFavoriteList: (state, action) => {
      state.favoritelistItems = state.favoritelistItems.filter(
        (item) => item.tmdb_id !== action.payload
      );
      localStorage.setItem(
        "favoritelistItems",
        JSON.stringify(state.favoritelistItems)
      );
    },
    updateFavoriteList: (state, action) => {
      state.favoritelistItems = action.payload;
      localStorage.setItem(
        "favoritelistItems",
        JSON.stringify(state.favoritelistItems)
      );
    },
    eareseFavoriteList: (state) => {
      state.favoritelistItems = [];
      localStorage.setItem(
        "favoritelistItems",
        JSON.stringify(state.favoritelistItems)
      );
    },
  },
});

export const {
  addFavoriteList,
  removeFavoriteList,
  updateFavoriteList,
  eareseFavoriteList,
} = favoriteListSlice.actions;

export default favoriteListSlice.reducer;
