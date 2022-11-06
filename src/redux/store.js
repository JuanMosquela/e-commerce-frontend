import { configureStore } from "@reduxjs/toolkit";
import shoppingCartRedux, { reloadCart } from "./shoppingCartRedux";

export const store = configureStore({
  reducer: {
    cart: shoppingCartRedux,
  },
});

store.dispatch(reloadCart());
