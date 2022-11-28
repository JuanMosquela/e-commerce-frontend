import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  price: [0, 200],
  branch: "",
  rating: 0,
};

export const searchFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addBranch: (state, action) => {
      state.branch = action.payload;
    },
    addPrice: (state, action) => {
      state.price[0] = action.payload[0];
      state.price[1] = action.payload[1];
    },
    addRating: (state, action) => {
      state.rating = action.payload;
    },
    reset: (state) => {
      state.category = "";
      state.price = [0, 200];
      state.branch = "";
      state.rating = 0;
    },
  },
});

export const { addCategory, addBranch, addPrice, addRating, reset } =
  searchFilterSlice.actions;

export default searchFilterSlice.reducer;
