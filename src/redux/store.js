import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSliceRedux";
import { productsApi } from "./api/productsApi";
import shoppingCartRedux, { reloadCart } from "./shoppingCartRedux";
import searchFilterSlice from "./searchFilterRedux";

export const store = configureStore({
  reducer: {
    cart: shoppingCartRedux,
    auth: authReducer,
    filter: searchFilterSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

store.dispatch(reloadCart());
