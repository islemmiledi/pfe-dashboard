import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAllGerant = createAsyncThunk("get/allGerant", async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const configuration = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(`${apiBaseUrl}/user/users`, configuration);
    return response;
  } catch (error) {
    console.log(error);
  }
});

// export const getCurrentUser = createAsyncThunk("get/CurrentUser", async () => {
//   try {
//     const accessToken = localStorage.getItem("token");
//     const configuration = {
//       headers: {
//         Authorization: accessToken ? `Bearer ${accessToken}` : "",
//       },
//     };
//     let response = await axios.get(`${apiBaseUrl}/user/current`, configuration);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// });

export const getfindOneWithId = createAsyncThunk(
  "get/findOneWithId",
  async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const configuration = {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/user/oneuser`,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllGerantWithPagination = createAsyncThunk(
  "get/allGerantWithPagination",
  async (page) => {
    console.log(page);
    try {
      const accessToken = localStorage.getItem("token");
      const configuration = {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/user/users/pagination?page=${page}`,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ajoutGerant = createAsyncThunk(
  "register/addGerant",
  async (myForm) => {
    try {
      const configuration = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/auth/register`,
        myForm,
        configuration
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteGerant = createAsyncThunk("delete/Gerant", async (id) => {
  try {
    let response = await axios.delete(`${apiBaseUrl}/user/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getOneGerantById = createAsyncThunk("get/GerantId", async (id) => {
  try {
    let response = await axios.get(`${apiBaseUrl}/user/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateGerant = createAsyncThunk(
  "put/updateGerant",
  async ({ id, selectedItem }) => {
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/user/${id}`,
        selectedItem,
        configuration
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
