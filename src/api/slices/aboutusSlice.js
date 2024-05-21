import { createSlice } from "@reduxjs/toolkit";

import {
  getAllAboutUs,
  ajoutAboutUs,
  getOneAboutUsById,
  updateAboutUs,
  deleteAboutUs,
  getAllAboutUssByUser,
} from "../actions/aboutus.actions";

const initialState = {
  aboutus: {},
  aboutuss: [],
  aboutussuser: [],
  loading: false,
  error: null,
};

export const aboutusSlice = createSlice({
  name: "aboutus",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAboutUs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAboutUs.fulfilled, (state, action) => {
      state.aboutuss = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAboutUs.rejected, (state, action) => {
      state.aboutuss = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getAllAboutUssByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAboutUssByUser.fulfilled, (state, action) => {
      state.aboutussuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAboutUssByUser.rejected, (state, action) => {
      state.aboutussuser = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(ajoutAboutUs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutAboutUs.fulfilled, (state, action) => {
      state.aboutus = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutAboutUs.rejected, (state, action) => {
      state.aboutus = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneAboutUsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneAboutUsById.fulfilled, (state, action) => {
      state.aboutus = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneAboutUsById.rejected, (state, action) => {
      state.aboutus = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAboutUs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAboutUs.fulfilled, (state, action) => {
      state.aboutus = action.payload;
      state.loading = false;
    });
    builder.addCase(updateAboutUs.rejected, (state, action) => {
      state.aboutus = {};
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteAboutUs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAboutUs.fulfilled, (state, action) => {
      state.aboutus = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAboutUs.rejected, (state, action) => {
      state.aboutus = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default aboutusSlice.reducer;
