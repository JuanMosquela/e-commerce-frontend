import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  min_price: 0,
  max_price: 200000,
  branch: "",
  rating: 0,
  sort: "",
  page: 1,
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
    addMinPrice: (state, action) => {
      state.min_price = action.payload;
    },
    addMaxPrice: (state, action) => {
      state.max_price = action.payload;
    },
    addRating: (state, action) => {
      state.rating = action.payload;
    },
    addSorting: (state, action) => {
      state.sort = action.payload;
    },
    addPage: (state, action) => {
      state.page = action.payload;
    },
    reset: (state) => {
      state.category = "";
      state.min_price = 0;
      state.max_price = 50000;
      state.branch = "";
      state.rating = 0;
      state.sort = "";
    },
  },
});

export const {
  addCategory,
  addBranch,
  addPrice,
  addRating,
  addSorting,
  reset,
  addMaxPrice,
  addMinPrice,
  addPage,
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
