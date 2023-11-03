import { apiSlice } from "./apiSlice";

const FAVORITE_URL = "/api/user/favorite-list";

export const favoriteListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getFavoriteList: builder.query({
    //   query: () => `${FAVORITE_URL}`, // adjust the endpoint according to your server setup
    // }),
    getAllFavorites: builder.mutation({
      query: () => ({
        url: `${FAVORITE_URL}`,
        method: "GET",
      }),
    }),
    addToFavoriteList: builder.mutation({
      query: (data) => ({
        url: `${FAVORITE_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    removeFavoriteList: builder.mutation({
      query: (data) => ({
        url: `${FAVORITE_URL}/remove`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllFavoritesMutation,
  useAddToFavoriteListMutation,
  useRemoveFavoriteListMutation,
} = favoriteListApiSlice;
