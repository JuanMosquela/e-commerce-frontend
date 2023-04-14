import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const cart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  cart: cart ? cart : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    setCart: (state, action) => {
      const cart = action.payload;
      console.log(cart);
      state.cart = cart;

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout, setCart } = authSlice.actions;

export default authSlice.reducer;
