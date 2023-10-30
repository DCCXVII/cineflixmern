import { apiSlice } from "./apiSlice";

const FAVORITELIST_URL = "/api/user/favoritelist";

export const favoriteListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavoriteList: builder.query({
      query: () => ({
        url: `${FAVORITELIST_URL}`,
        method: "GET",
      }),
    }),
    addItemToFavoriteList: builder.mutation({
      query: (data) => ({
        url: `${FAVORITELIST_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    removeItemFromFavoriteList: builder.mutation({
      query: (data) => ({
        url: `${FAVORITELIST_URL}/remove`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFavoriteListQuery,
  useAddItemToFavoriteListMutation,
  useRemoveItemFromFavoriteListMutation,
} = favoriteListApiSlice;
