import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-backend-production-03e0.up.railway.app/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log(headers);
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
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: rest,
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
} = productsApi;
