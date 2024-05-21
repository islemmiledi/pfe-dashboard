import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllMembre = createAsyncThunk("get/allMembre", async () => {
  try {
    let response = await axios.get(`${apiBaseUrl}/membre/members`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const ajoutMembre = createAsyncThunk(
  "post/addMembre",
  async (membre) => {
    try {
      const configuration = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/membre/create`,
        membre,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
