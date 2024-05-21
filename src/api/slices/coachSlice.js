import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCoach,
  ajoutCoach,
  deleteCoach,
  getOneCoachById,
  updateCoach,
  getAllCoachsByUser,
} from "../actions/coach.actions"; // Assurez-vous que le chemin d'importation est correct

const initialState = {
  coach: {},
  coachs: [],
  coachsuser: [],
  loading: false,
  error: null,
};

export const coachSlice = createSlice({
  name: "coach",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCoach.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCoach.fulfilled, (state, action) => {
      state.coachs = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCoach.rejected, (state, action) => {
      state.coachs = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(ajoutCoach.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ajoutCoach.fulfilled, (state, action) => {
      state.coach = action.payload;
      state.loading = false;
    });
    builder.addCase(ajoutCoach.rejected, (state, action) => {
      state.coach = {};
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCoach.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCoach.fulfilled, (state, action) => {
      state.coach = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteCoach.rejected, (state, action) => {
      state.coach = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneCoachById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneCoachById.fulfilled, (state, action) => {
      state.coach = action.payload;
      state.loading = false;
    });
    builder.addCase(getOneCoachById.rejected, (state, action) => {
      state.coach = {};
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCoach.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoach.fulfilled, (state, action) => {
      state.coach = action.payload;
      state.loading = false;
    });
    builder.addCase(updateCoach.rejected, (state, action) => {
      state.coach = {};
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllCoachsByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCoachsByUser.fulfilled, (state, action) => {
      state.coachsuser = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCoachsByUser.rejected, (state, action) => {
      state.coachsuser = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default coachSlice.reducer;
