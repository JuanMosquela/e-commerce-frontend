import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSliceRedux";
import shoppingCartRedux, { reloadCart } from "./shoppingCartRedux";

export const store = configureStore({
  reducer: {
    cart: shoppingCartRedux,
    auth: authReducer,
  },
});

store.dispatch(reloadCart());
