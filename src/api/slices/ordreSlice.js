import { createSlice } from "@reduxjs/toolkit";

import { getAllOrdres } from "../actions/ordre.actions";

const initialState = {
  ordres: [],
  loading: false,
  error: null,
};

export const ordresSlice = createSlice({
  name: "ordres",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrdres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrdres.fulfilled, (state, action) => {
      state.ordres = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOrdres.rejected, (state, action) => {
      state.ordres = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default ordresSlice.reducer;
