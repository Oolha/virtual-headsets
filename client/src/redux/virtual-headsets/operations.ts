import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VRHeadset } from "../types";

interface ApiResponse {
  data: {
    data: VRHeadset[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}
export type FetchHeadsetsResponse = VRHeadset[];

type FetchHeadsetsError = string;

export const fetchAllVrHeadsets = createAsyncThunk<
  FetchHeadsetsResponse,
  void,
  { rejectValue: FetchHeadsetsError }
>("virtualHeadsets/fetchVirtualHeadsets", async (_, thunkAPI) => {
  const BASE_URL = "https://virtual-headsets-store-api.onrender.com";
  const END_POINT = "/headsets";
  const url = BASE_URL + END_POINT;
  try {
    const response = await axios.get<ApiResponse>(url);
    return response.data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
