import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFooter,
  updateFooter,
  getOneFooterById,
  deleteFooter,
  getAllFootersByUser,
} from "../actions/footer.actions"; // Assurez-vous que le chemin d'importation est correct

const initialState = {
  footer: {},
  footers: [],
  footersuser: [],
  loading: false,
  error: null,
};

export const footerSlice = createSlice({
  name: "footer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFooter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFooter.fulfilled, (state, action) => {
      state.footers = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllFooter.rejected, (state, action) => {
      state.footers = [];
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllFootersByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFootersByUser.fulfilled, (state, action) => {
      state.footersuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllFootersByUser.rejected, (state, action) => {
      state.footersuser = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOneFooterById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneFooterById.fulfilled, (state, action) => {
      state.footer = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneFooterById.rejected, (state, action) => {
      state.footer = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateFooter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFooter.fulfilled, (state, action) => {
      state.footer = action.payload;
      state.loading = false;
    });
    builder.addCase(updateFooter.rejected, (state, action) => {
      state.footer = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteFooter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFooter.fulfilled, (state, action) => {
      state.footer = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteFooter.rejected, (state, action) => {
      state.footer = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default footerSlice.reducer;
