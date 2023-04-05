import emptyApi from "./emptyApi";

const extendedReviewsApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useFetchAllReviewsQuery, useCreateReviewMutation } =
  extendedReviewsApi;
