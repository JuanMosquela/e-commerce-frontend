import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fit-commerce-api.onrender.com/api",
  }),
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => "/products",
    }),
    fetchSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    fetchAllProductsByNameOrCategory: builder.query({
      query: (inputValue) => `/search/?search=${inputValue}`,
    }),
    fetchAllReviews: builder.query({
      query: (id) => `/products/reviews/${id}`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: ({ uid, ...review }) => ({
        url: `/products/reviews/${uid}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchSingleProductQuery,
  useFetchAllProductsByNameOrCategoryQuery,
  useFetchAllReviewsQuery,
  useCreateReviewMutation,
} = productsApi;
