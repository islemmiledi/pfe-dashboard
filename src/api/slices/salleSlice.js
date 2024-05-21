import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSalle,
  ajoutSalle,
  deleteSalle,
  updateSalle,
  getOneSalleById,
} from "../actions/salle.actions"; // Assurez-vous que le chemin d'importation est correct

const initialState = {
  salle: {},
  salles: [],
  loading: false,
  error: null,
};

export const salleSlice = createSlice({
  name: "salle",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSalle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSalle.fulfilled, (state, action) => {
      state.salles = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllSalle.rejected, (state, action) => {
      state.salles = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(ajoutSalle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutSalle.fulfilled, (state, action) => {
      state.salle = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutSalle.rejected, (state, action) => {
      state.salle = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteSalle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSalle.fulfilled, (state, action) => {
      state.salle = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteSalle.rejected, (state, action) => {
      state.salle = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getOneSalleById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneSalleById.fulfilled, (state, action) => {
      state.salle = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneSalleById.rejected, (state, action) => {
      state.salle = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateSalle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSalle.fulfilled, (state, action) => {
      state.salle = action.payload;
      state.loading = false;
    });
    builder.addCase(updateSalle.rejected, (state, action) => {
      state.salle = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default salleSlice.reducer;
