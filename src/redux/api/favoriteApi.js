import emptyApi from "./emptyApi";

const extendedFavoriteApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavProducts: builder.query({
      query: (id) => `/favorites/${id}`,
      providesTags: ["Favorites"],
    }),
    addToFav: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/favorites/${id}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFav: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/favorites/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavProductsQuery,
  useAddToFavMutation,
  useRemoveFavMutation,
} = extendedFavoriteApi;
