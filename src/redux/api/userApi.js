import emptyApi from "./emptyApi";

const extendedUserApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetUserQuery,
  useUpdatePictureMutation,
  useUpdateUserMutation,
} = extendedUserApi;
