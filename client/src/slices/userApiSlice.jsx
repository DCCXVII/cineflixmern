import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    watchlist: builder.query({
      query: () => ({
        url: `${USER_URL}/watchlist`,
      }),
    }),
    
    addItem: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/watchlist/add`,
        method: "POST",
        body: data,
      }),
    }),
    removeItem: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}watchlist/remove`,
        method: "POST",
        body: data,
      }),
    }),

    itemName: builder.query({
      query: (TMDB_ID) => ({
        url: `${USER_URL}/watchlist/item`,
        body: { TMDB_ID },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useWatchlistQuery,
  useAddItemMutation,
  useRemoveItemMutation,
  useItemNameQuery,
} = userApiSlice;
