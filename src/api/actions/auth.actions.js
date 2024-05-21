import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectedWithValue }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/auth/login`,
        user,
        configuration
      );
      console.log(response);
      return response;
    } catch (error) {
      // console.log(error);
      if (!error.response) {
        throw error;
      }
      const errorMessage = error.response.data.message || "login failed";
      return rejectedWithValue(errorMessage);
    }
  }
);
