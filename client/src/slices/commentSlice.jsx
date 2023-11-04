import { createSlice } from "@reduxjs/toolkit";

const CommentsItemsFromStorage = localStorage.getItem("commentsItems");

const initialState = {
  CommentsItems: CommentsItemsFromStorage
    ? Array.isArray(JSON.parse(CommentsItemsFromStorage))
      ? JSON.parse(CommentsItemsFromStorage)
      : []
    : [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addingComment: (state, action) => {
      state.CommentsItems.push(action.payload);
      localStorage.setItem(
        "CommentsItems",
        JSON.stringify(state.CommentsItems)
      );
    },
    removeComment: (state, action) => {
      state.CommentsItems = state.CommentsItems.filter(
        (item) => item.tmdb_id !== action.payload
      );
      localStorage.setItem(
        "CommentsItems",
        JSON.stringify(state.CommentsItems)
      );
    },
    updateComment: (state, action) => {
      state.CommentsItems = action.payload;
      localStorage.setItem(
        "CommentsItems",
        JSON.stringify(state.CommentsItems)
      );
    },
    getComments: (state, action) => {
      state.CommentsItems = action.payload;
      localStorage.setItem(
        "CommentsItems",
        JSON.stringify(state.CommentsItems)
      );
    },
    eareseComment: (state) => {
      state.CommentsItems = [];
      localStorage.setItem(
        "CommentsItems",
        JSON.stringify(state.CommentsItems)
      );
    },
  },
});

export const {
  addingComment,
  removeComment,
  updateComment,
  eareseComment,
  getComments,
} = commentSlice.actions;

export default commentSlice.reducer;
