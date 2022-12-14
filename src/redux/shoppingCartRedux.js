import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [],
  quantity: localStorage.getItem("cartQuantity")
    ? JSON.parse(localStorage.getItem("cartQuantity") || "")
    : 0,
  totalPrice: 0,
};

export const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      let counter = action.payload.counter;

      state.quantity += counter ? counter : 1;
      const existingIndex = state.cart.findIndex(
        (item) => item._id === action.payload.product._id
      );

      console.log(existingIndex);

      if (existingIndex >= 0) {
        state.cart[existingIndex] = {
          ...state.cart[existingIndex],
          amount: counter
            ? state.cart[existingIndex].amount + counter
            : state.cart[existingIndex].amount + 1,
        };
        toast.info("incresed product quantity", {
          position: "bottom-right",
        });
      } else {
        let tempProductItem = {
          ...action.payload.product,
          amount: counter ? counter : 1,
        };
        state.cart.push(tempProductItem);
        toast.success(`added ${action.payload.product.title} to cart`, {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => {
        return item._id === action.payload._id;
      });

      state.quantity -= state.cart[itemIndex].amount;
      localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));

      const newArray = state.cart.filter((product) => {
        return product._id !== action.payload._id;
      });
      state.cart = newArray;

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrese: (state, action) => {
      state.quantity -= 1;
      localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));

      const itemIndex = state.cart.findIndex((item) => {
        return item._id === action.payload._id;
      });

      if (state.cart[itemIndex].amount > 1) {
        state.cart[itemIndex].amount -= 1;
      } else {
        const newArray = state.cart.filter((product) => {
          return product._id !== action.payload._id;
        });
        state.cart = newArray;

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    increse: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => {
        return item._id === action.payload._id;
      });

      state.cart[itemIndex].amount += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    reloadCart(state) {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.quantity += amount;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.quantity = quantity;
      state.totalPrice = total;
    },
    clearCart: (state) => {
      state.cart = [];
      state.quantity = 0;
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const {
  addToCart,
  removeItem,
  decrese,
  increse,
  reloadCart,
  clearCart,
} = shoppingCartSlice.actions;

export const useCartSelector = (state) => state.cart;

export default shoppingCartSlice.reducer;
