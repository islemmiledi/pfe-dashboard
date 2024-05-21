import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllSalle = createAsyncThunk("get/allSalle", async () => {
  try {
    let response = await axios.get(`${apiBaseUrl}/salle/salles`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

// export const ajoutSalle = createAsyncThunk("post/addSalle", async (salle) => {
//   try {
//     const configuration = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     let response = await axios.post(
//       `${apiBaseUrl}/salle/create`,
//       salle,
//       configuration
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// });
export const ajoutSalle = createAsyncThunk(
  "register/addSalle",
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
        `${apiBaseUrl}/salle/create`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSalle = createAsyncThunk("delete/Salle", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/salle/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getOneSalleById = createAsyncThunk("get/SalleId", async (id) => {
  try {
    let response = await axios.get(`${apiBaseUrl}/salle/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateSalle = createAsyncThunk(
  "put/updateSalle",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/salle/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
