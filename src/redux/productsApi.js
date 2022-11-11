import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fit-commerce-api.onrender.com/api",
  }),
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => "products",
    }),
  }),
});

export const { useFetchAllProductsQuery } = productsApi;
