import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getCommentsRequest: (state) => {
      state.loading = true;
    },
    getCommentsSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    getCommentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});

export const {
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailure,
  addComment,
  removeComment,
} = commentSlice.actions;

export default commentSlice.reducer;