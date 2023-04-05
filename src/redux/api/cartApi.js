import emptyApi from "./emptyApi";

const extendedCartApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addProductToCart: builder.mutation({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateProductCart: builder.mutation({
      query: ({ id, ...value }) => ({
        url: `/cart/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useRemoveFromCartMutation,
  useUpdateProductCartMutation,
  useClearCartMutation,
} = extendedCartApi;
