import emptyApi from "./emptyApi";

const extendedAuthApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = extendedAuthApi;
