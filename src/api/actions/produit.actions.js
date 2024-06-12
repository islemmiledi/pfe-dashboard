import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllProduit = createAsyncThunk(
  "get/allProduit",
  async (salleId) => {
    const accessToken = localStorage.getItem("token");
    const configuration = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    try {
      let response = await axios.get(
        `${apiBaseUrl}/produit/produit-salle?salleId=${salleId}`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllProgduitsByUser = createAsyncThunk(
  "get/AllProduitsByUser",
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
        `${apiBaseUrl}/produit/produit-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOneProduitById = createAsyncThunk(
  "get/ProduitId",
  async (id) => {
    try {
      let response = await axios.get(`${apiBaseUrl}/produit/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduit = createAsyncThunk("delete/Produit", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/produit/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});


export const ajoutProduit = createAsyncThunk(
  "register/addProgram",
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
        `${apiBaseUrl}/produit/create`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduit = createAsyncThunk(
  "put/updateProduit",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/produit/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
