import { apiSlice } from "./apiSlice";

const COMMENT_URL = "/api/user/comments";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (TMDB_ID) => ({
        url: `${COMMENT_URL}?TMDB_ID=${TMDB_ID}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    removeComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}/${data.commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
} = commentApiSlice;
