import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllFooter = createAsyncThunk(
  "get/allFooter",
  async (salleId) => {
    try {
      let response = await axios.get(
        `${apiBaseUrl}/footer/footer-salle?salleId=${salleId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOneFooterById = createAsyncThunk("get/FooterId", async (id) => {
  try {
    let response = await axios.get(`${apiBaseUrl}/footer/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getAllFootersByUser = createAsyncThunk(
  "get/AllFootersByUser",
  async () => {
    // console.log(salleId);
    try {
      const accessToken = localStorage.getItem("token");
      const configuration = {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/footer/footer-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);


export const updateFooter = createAsyncThunk(
  "put/updateFooter",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/footer/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteFooter = createAsyncThunk("delete/Footer", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/footer/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});
