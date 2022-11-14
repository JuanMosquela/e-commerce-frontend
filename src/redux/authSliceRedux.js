import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicRequest from "../utils/request-methods";

import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userLogin: user ? user : null,
  userRegister: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const signUpUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { user } = await publicRequest.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log(user);
      return user;
    } catch (error) {
      const msg =
        (error.response.data &&
          error.response.data &&
          error.response.data.msg) ||
        error.msg ||
        error.toString();
      toast.error(`${msg}`, { position: "top-right" });
      return rejectWithValue(msg);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      console.log("signin function");
      const data = await publicRequest.login({
        email: values.email,
        password: values.password,
      });

      console.log(data);

      if (data?.token) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("User login correctly", { position: "top-right" });
      }

      return data;
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(`${msg}`, { position: "top-right" });
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.userLogin = null;
      state.userRegister = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        userRegister: action.payload,
      };
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        msg: action.payload,
        userRegister: null,
      };
    });
    builder.addCase(signIn.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userLogin: action.payload,
      };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload,
        userLogin: null,
      };
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
