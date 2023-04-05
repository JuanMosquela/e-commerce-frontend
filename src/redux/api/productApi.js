import emptyApi from "./emptyApi";

const extendedProductApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({ category, branch, max_price, min_price }) =>
        `/products?category=${category}&branch=${branch}&price[lte]=${max_price}&price[gte]=${min_price}`,
    }),
    fetchTopRatedProducts: builder.query({
      query: () => "/products/rated",
    }),
    fetchSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    fetchAllProductsByNameOrCategory: builder.query({
      query: (inputValue) => `/search/?search=${inputValue}`,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchTopRatedProductsQuery,
  useFetchSingleProductQuery,
  useFetchAllProductsByNameOrCategoryQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = extendedProductApi;
