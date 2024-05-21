import { createSlice } from "@reduxjs/toolkit";
import { ajoutMembre, getAllMembre } from "../actions/membre.actions";

const initialState = {
  membre: {},
  membres: [],
  loading: false,
  error: null,
};

export const membreSlice = createSlice({
  name: "membre",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMembre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllMembre.fulfilled, (state, action) => {
      state.membres = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllMembre.rejected, (state, action) => {
      state.membres = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(ajoutMembre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutMembre.fulfilled, (state, action) => {
      state.membre = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutMembre.rejected, (state, action) => {
      state.membre = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default membreSlice.reducer;
