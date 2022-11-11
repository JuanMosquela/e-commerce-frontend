import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AiOutlineConsoleSql } from "react-icons/ai";
import publicRequest, { BASE_URL } from "../utils/request-methods";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const initialState = {
  token: localStorage.getItem("token"),
  name: localStorage.getItem("user"),
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
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
      const { msg } = error.response.data;
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

      if (data?.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("name", JSON.stringify(data.name));
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
    logout(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      if (action.payload) {
        // const user = jwtDecode(action.payload);

        return {
          ...state,
          //   token: action.payload,
          name: action.name,
          email: action.email,
          _id: action._id,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(signIn.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload) {
        // const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: action.name,
          email: action.email,
          _id: action._id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentUser = (state) => state.auth.user;
export const currenToken = (state) => state.auth.token;
