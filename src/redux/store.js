import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSliceRedux";
import shoppingCartRedux, { reloadCart } from "./shoppingCartRedux";
import searchFilterSlice from "./searchFilterRedux";
import emptyApi from "./api/emptyApi";

export const store = configureStore({
  reducer: {
    cart: shoppingCartRedux,
    auth: authReducer,
    filter: searchFilterSlice,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(emptyApi.middleware);
  },
});

store.dispatch(reloadCart());
