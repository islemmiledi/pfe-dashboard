import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllProgram = createAsyncThunk(
  "get/allProgram",
  async (salleId) => {
    const accessToken = localStorage.getItem("token");
    const configuration = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    try {
      let response = await axios.get(
        `${apiBaseUrl}/program/program-salle?salleId=${salleId}`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllProgramsByUser = createAsyncThunk(
  "get/AllProgramsByUser",
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
        `${apiBaseUrl}/program/program-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSalleByWebsite = createAsyncThunk(
  "get/SalleByWebsite",
  async (website) => {
    try {
      const accessToken = localStorage.getItem("token");
      const configuration = {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}salle/${website}`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ajoutProgram = createAsyncThunk(
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
        `${apiBaseUrl}/program/create`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProgram = createAsyncThunk("delete/Program", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/program/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateProgram = createAsyncThunk(
  "put/updateProgram",
  async (id, myForm) => {
    console.log(id, myForm);
    try {
      const configuration = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/program/update/${id}`,
        myForm,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
