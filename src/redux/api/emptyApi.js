import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emptyApi = createApi({
  reducerPath: "emptyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fit-commerce-api.onrender.com/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default emptyApi;
