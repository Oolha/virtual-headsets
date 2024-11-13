import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGet = createAsyncThunk(
  "virtualHeadsets/fetchVirtualHeadsets",
  async (_, thunkAPI) => {
    const BASE_URL = "";
    const END_POINT = "/headsets";
    const url = BASE_URL + END_POINT;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
