import { createSlice, current } from "@reduxjs/toolkit";
import {
  ajoutGerant,
  deleteGerant,
  getAllGerant,
  getAllGerantWithPagination,
  getCurrentUser,
  getOneGerantById,
  getfindOneWithId,
  updateGerant,
} from "../actions/gerant.actions";

const initialState = {
  user: {},
  current: {},
  users: [],
  usersPagination: [],
  loading: false,
  error: null,
};

export const gerantSlice = createSlice({
  name: "gerant",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGerant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllGerant.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllGerant.rejected, (state, action) => {
      state.users = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getfindOneWithId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getfindOneWithId.fulfilled, (state, action) => {
      state.current = action.payload;
      state.loading = false;
    });
    builder.addCase(getfindOneWithId.rejected, (state, action) => {
      state.current = {};
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getAllGerantWithPagination.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllGerantWithPagination.fulfilled, (state, action) => {
      state.usersPagination = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllGerantWithPagination.rejected, (state, action) => {
      state.usersPagination = [];
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(ajoutGerant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutGerant.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutGerant.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteGerant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGerant.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteGerant.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOneGerantById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneGerantById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneGerantById.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateGerant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateGerant.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateGerant.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default gerantSlice.reducer;
