import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: credentials => ({
              url: "/auth/login",
              method: "POST",
              body: {...credentials},
            }),
          }),
          signUp: builder.mutation({
            query: (body) => ({
              url: "/auth/register",
              method: "POST",
              body: body,
            }),
          }),
    })
})