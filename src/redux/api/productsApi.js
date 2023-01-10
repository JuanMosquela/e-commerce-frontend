import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-backend-production-e980.up.railway.app/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Cart"],
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),
    fetchAllProducts: builder.query({
      query: () => "/products",
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
    fetchAllReviews: builder.query({
      query: (id) => `/products/reviews/${id}`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: ({ id, ...review }) => ({
        url: `/products/reviews/${id}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
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
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePicture: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/uploads/users/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
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
    createMercadoPagoButton: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/order/create-payment/${id}`,
        body: rest,
        method: "POST",
      }),
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: `/order`,
        method: "POST",
        body,
      }),
    }),
    createPayment: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/order/create-payment/${id}`,
        body: rest,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useFetchAllProductsQuery,
  useFetchTopRatedProductsQuery,
  useFetchSingleProductQuery,
  useFetchAllProductsByNameOrCategoryQuery,
  useFetchAllReviewsQuery,
  useCreateReviewMutation,
  useGetFavProductsQuery,
  useAddToFavMutation,
  useRemoveFavMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePictureMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCartQuery,
  useAddProductToCartMutation,
  useUpdateProductCartMutation,
  useClearCartMutation,
  useRemoveFromCartMutation,
  useCreateOrderMutation,
  useCreatePaymentMutation,
  useCreateMercadoPagoButtonMutation,
} = productsApi;
