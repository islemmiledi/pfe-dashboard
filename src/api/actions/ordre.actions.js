import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllOrdres = createAsyncThunk("get/allOrdres", async () => {
  try {
    let response = await axios.get(`${apiBaseUrl}/ordre/ordres`);
    return response;
  } catch (error) {
    console.log(error);
  }
});
