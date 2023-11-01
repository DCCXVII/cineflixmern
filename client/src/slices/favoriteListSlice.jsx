import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritelistItems: localStorage.getItem("favoritelistItems")
    ? JSON.parse(localStorage.getItem("favoritelistItems"))
    : [],
};

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let buildFavoriteList = {
        ...action.payload.favorite.FavoritelistItems[0],
      };

      state.favoritelistItems?.push(buildFavoriteList);
      localStorage.setItem(
        "favoritelistItems",
        JSON.stringify(state.favoritelistItems)
      );
    },
    removeItem: (state, action) => {
      let filtredItems = state.favoritelistItems = state.favoritelistItems?.filter(
        (item) => item?.TMDB_ID !== action.payload?.TMDB_ID
      );

      state.favoritelistItems = filtredItems;
      localStorage.setItem(
        "favoritelistItems",
        JSON.stringify(state.favoritelistItems)
      );
    },
  },
});

export const {
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure,
  addItem,
  removeItemFromFavoriteList,
} = favoriteListSlice.actions;

export default favoriteListSlice.reducer;
