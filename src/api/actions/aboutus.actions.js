import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllAboutUs = createAsyncThunk(
  "get/allAboutUs",
  async (salleId) => {
    try {
      let response = await axios.get(
        `${apiBaseUrl}/aboutus/aboutus-salle?salleId=${salleId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAboutUssByUser = createAsyncThunk(
  "get/AllAboutUssByUser",
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
        `${apiBaseUrl}/aboutus/aboutus-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ajoutAboutUs = createAsyncThunk(
  "register/addAboutUs",
  async (myForm) => {
    try {
      const accessToken = localStorage.getItem("token");
      const configuration = {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "multipart/form-data",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/aboutus/create`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOneAboutUsById = createAsyncThunk(
  "get/AboutUsId",
  async (id) => {
    try {
      let response = await axios.get(`${apiBaseUrl}/aboutus/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAboutUs = createAsyncThunk(
  "put/updateAboutUs",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/aboutus/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAboutUs = createAsyncThunk("delete/AboutUs", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/aboutus/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});
