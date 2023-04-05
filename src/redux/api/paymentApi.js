import emptyApi from "./emptyApi";

const extendedPaymentApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
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
    getOrders: builder.query({
      query: (id) => `/order/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateMercadoPagoButtonMutation,
  useGetOrdersQuery,
  useCreatePaymentMutation,
} = extendedPaymentApi;
