import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllCoach = createAsyncThunk("get/allCoach", async (salleId) => {
  try {
    const accessToken = localStorage.getItem("token");
    const configuration = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(
      `${apiBaseUrl}/coach/coach-salle?salleId=${salleId}`,
      configuration
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const getAllCoachsByUser = createAsyncThunk(
  "get/getAllCoachsByUser",
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
        `${apiBaseUrl}/coach/coach-user`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);



export const ajoutCoach = createAsyncThunk(
  "register/addCoach",
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
        `${apiBaseUrl}/coach/create`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCoach = createAsyncThunk("delete/Coach", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/coach/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getOneCoachById = createAsyncThunk("get/CoachId", async (id) => {
  try {
    let response = await axios.get(`${apiBaseUrl}/coach/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateCoach = createAsyncThunk(
  "put/updateCoach",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/coach/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
