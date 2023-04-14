import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSliceRedux";

import searchFilterSlice from "./searchFilterRedux";
import emptyApi from "./api/emptyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: searchFilterSlice,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(emptyApi.middleware);
  },
});
