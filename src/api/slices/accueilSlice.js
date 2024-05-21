import { createSlice } from "@reduxjs/toolkit";
// Assurez-vous que le chemin d'importation est correct
import {
  getAllAccueil,
  ajoutAccueil,
  updateAccueil,
  getOneAccueilById,
  deleteAccueil,
  getAllAccueilsByUser,
} from "../actions/accueil.actions";

const initialState = {
  accueil: {},
  accueils: [],
  accueilsuser: [],
  loading: false,
  error: null,
};

export const accueilSlice = createSlice({
  name: "accueil",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccueil.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccueil.fulfilled, (state, action) => {
      state.accueils = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAccueil.rejected, (state, action) => {
      state.accueils = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getAllAccueilsByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccueilsByUser.fulfilled, (state, action) => {
      state.accueilsuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAccueilsByUser.rejected, (state, action) => {
      state.accueilsuser = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(ajoutAccueil.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutAccueil.fulfilled, (state, action) => {
      state.accueil = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutAccueil.rejected, (state, action) => {
      state.accueil = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAccueil.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccueil.fulfilled, (state, action) => {
      state.accueil = action.payload;
      state.loading = false;
    });
    builder.addCase(updateAccueil.rejected, (state, action) => {
      state.accueil = {};
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOneAccueilById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneAccueilById.fulfilled, (state, action) => {
      state.accueil = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneAccueilById.rejected, (state, action) => {
      state.accueil = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteAccueil.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccueil.fulfilled, (state, action) => {
      state.accueil = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAccueil.rejected, (state, action) => {
      state.accueil = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default accueilSlice.reducer;
