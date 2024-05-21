import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllOffre = createAsyncThunk("get/allOffre", async (salleId) => {
  try {
    let response = await axios.get(
      `${apiBaseUrl}/offre/offre-salle?salleId=${salleId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getAllOffresByUser = createAsyncThunk(
  "get/getAllOffresByUser",
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
        `${apiBaseUrl}/offre/offre-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ajoutOffre = createAsyncThunk("post/addOffre", async (offre) => {
  try {
    const accessToken = localStorage.getItem("token");
    const configuration = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
    };

    let response = await axios.post(
      `${apiBaseUrl}/offre/create`,
      offre,
      configuration
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateOffre = createAsyncThunk(
  "put/updateOffre",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/offre/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteOffre = createAsyncThunk("delete/Offre", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/offre/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getOneOffreById = createAsyncThunk("get/OffreId", async (id) => {
  try {
    let response = await axios.get(`${apiBaseUrl}/offre/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});
