import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllAccueil = createAsyncThunk(
  "get/AllAccueil",
  async (salleId) => {
    const accessToken = localStorage.getItem("token");
    const configuration = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    try {
      let response = await axios.get(
        `${apiBaseUrl}/home/home-salle?salleId=${salleId}`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAccueilsByUser = createAsyncThunk(
  "get/AllAccueilsByUser",
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
        `${apiBaseUrl}/home/home-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ajoutAccueil = createAsyncThunk(
  "register/addAccueil",
  async (myForm) => {
    try {
      const accessToken = localStorage.getItem("token");

      const configuration = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/home/create`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAccueil = createAsyncThunk(
  "put/updateAccueil",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/home/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOneAccueilById = createAsyncThunk(
  "get/AccueilId",
  async (id) => {
    try {
      let response = await axios.get(`${apiBaseUrl}/home/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAccueil = createAsyncThunk("delete/Accueil", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/home/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});
