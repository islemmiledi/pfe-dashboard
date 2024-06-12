import { createSlice } from "@reduxjs/toolkit";

import {
  getAllProgduitsByUser,
  ajoutProduit,
  getAllProduit,
  getOneProduitById,
  deleteProduit,
  updateProduit,
} from "../actions/produit.actions";

const initialState = {
  produit: {},
  produitsuser: [],
  // website: {},
  produits: [],
  loading: false,
  error: null,
};

export const produitSlice = createSlice({
  name: "produit",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProgduitsByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProgduitsByUser.fulfilled, (state, action) => {
      state.produitsuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProgduitsByUser.rejected, (state, action) => {
      state.produitsuser = [];
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllProduit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProduit.fulfilled, (state, action) => {
      state.produits = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProduit.rejected, (state, action) => {
      state.produits = [];
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneProduitById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneProduitById.fulfilled, (state, action) => {
      state.coach = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneProduitById.rejected, (state, action) => {
      state.coach = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(ajoutProduit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutProduit.fulfilled, (state, action) => {
      state.produit = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutProduit.rejected, (state, action) => {
      state.produit = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProduit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduit.fulfilled, (state, action) => {
      state.produit = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteProduit.rejected, (state, action) => {
      state.produit = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduit.fulfilled, (state, action) => {
      state.produit = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProduit.rejected, (state, action) => {
      state.produit = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default produitSlice.reducer;
