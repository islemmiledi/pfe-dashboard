import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOffre,
  ajoutOffre,
  updateOffre,
  deleteOffre,
  getOneOffreById,
  getAllOffresByUser,
} from "../actions/offre.actions";

const initialState = {
  offre: {},
  offresuser: [],
  offres: [],
  loading: false,
  error: null,
};

export const offreSlice = createSlice({
  name: "offre",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOffre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOffre.fulfilled, (state, action) => {
      state.offres = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOffre.rejected, (state, action) => {
      state.offres = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(ajoutOffre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutOffre.fulfilled, (state, action) => {
      state.offre = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutOffre.rejected, (state, action) => {
      state.offre = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateOffre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOffre.fulfilled, (state, action) => {
      state.offre = action.payload;
      state.loading = false;
    });
    builder.addCase(updateOffre.rejected, (state, action) => {
      state.offre = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteOffre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOffre.fulfilled, (state, action) => {
      state.offre = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteOffre.rejected, (state, action) => {
      state.offre = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneOffreById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneOffreById.fulfilled, (state, action) => {
      state.offre = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneOffreById.rejected, (state, action) => {
      state.offre = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllOffresByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOffresByUser.fulfilled, (state, action) => {
      state.offresuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOffresByUser.rejected, (state, action) => {
      state.offresuser = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default offreSlice.reducer;
