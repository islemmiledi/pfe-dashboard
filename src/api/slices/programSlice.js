import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProgram,
  getSalleByWebsite,
  ajoutProgram,
  deleteProgram,
  updateProgram,
  getAllProgramsByUser,
} from "../actions/program.actions";

const initialState = {
  program: {},
  programsuser: [],
  // website: {},
  programs: [],
  loading: false,
  error: null,
};

export const programSlice = createSlice({
  name: "program",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProgram.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProgram.fulfilled, (state, action) => {
      state.programs = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProgram.rejected, (state, action) => {
      state.programs = [];
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSalleByWebsite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSalleByWebsite.fulfilled, (state, action) => {
      state.website = action.payload;
      state.loading = false;
    });
    builder.addCase(getSalleByWebsite.rejected, (state, action) => {
      state.website = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(ajoutProgram.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutProgram.fulfilled, (state, action) => {
      state.program = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutProgram.rejected, (state, action) => {
      state.program = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProgram.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProgram.fulfilled, (state, action) => {
      state.program = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteProgram.rejected, (state, action) => {
      state.program = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProgram.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProgram.fulfilled, (state, action) => {
      state.program = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProgram.rejected, (state, action) => {
      state.program = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllProgramsByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProgramsByUser.fulfilled, (state, action) => {
      state.programsuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProgramsByUser.rejected, (state, action) => {
      state.programsuser = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default programSlice.reducer;
