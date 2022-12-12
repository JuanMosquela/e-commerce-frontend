import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const id = JSON.parse(localStorage.getItem("id"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  user: user ? user : null,
  id: id ? id : null,
  token: token ? token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      const { name, token, _id } = action.payload;
      state.user = name;
      state.token = token;
      state.id = _id;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("id", JSON.stringify(state.id));
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
