import { apiSlice } from "./apiSlice";

const COMMENT_URL = "/api/user/comment";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: `${COMMENT_URL}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    removeComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}/remove`,
        method: "POST",
        body: data,
      }),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}/update`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} = commentApiSlice;
