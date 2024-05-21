import { createSlice } from "@reduxjs/toolkit";

import { login } from "../actions/auth.actions";

const initialState = {
  user: {},
  loading: false,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
      state.isAuth = true;
      state.error = null;

      localStorage.setItem("token", action.payload.data.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.isAuth = false;
      state.error = null;

      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
