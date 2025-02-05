import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { VRHeadset } from "../types";
import { RootState } from "../store";

interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

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

const BASE_URL = "https://virtual-headsets-store-api.onrender.com";
const CACHE_DURATION = 30 * 60 * 1000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config as ExtendedRequestConfig).metadata = { startTime: performance.now() };
  return config;
});

api.interceptors.response.use((response: AxiosResponse) => {
  const config = response.config as ExtendedRequestConfig;
  const startTime = config.metadata?.startTime;
  if (startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
  }
  return response;
});

interface ReviewFormData {
  comment: string;
  reviewer_rating: number;
  productId: string;
}
export const fetchAllVrHeadsets = createAsyncThunk<
  FetchHeadsetsResponse,
  void,
  { rejectValue: FetchHeadsetsError }
>("virtualHeadsets/fetchVirtualHeadsets", async (_, thunkAPI) => {
  try {
    const cachedData = localStorage.getItem("vrHeadsets");
    const cacheTimestamp = localStorage.getItem("vrHeadsetsCacheTime");

    if (cachedData && cacheTimestamp) {
      const cacheAge = Date.now() - Number(cacheTimestamp);
      if (cacheAge < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    const response = await api.get<ApiResponse>("/headsets");
    const sortedData = response.data.data.data.sort(
      (a, b) => a.order - b.order
    );

    localStorage.setItem("vrHeadsets", JSON.stringify(sortedData));
    localStorage.setItem("vrHeadsetsCacheTime", Date.now().toString());

    return sortedData;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const addReview = createAsyncThunk<
  void,
  ReviewFormData,
  { rejectValue: string }
>("virtualHeadsets/addReview", async (formData: ReviewFormData, thunkAPI) => {
  try {
    const user = (thunkAPI.getState() as RootState).auth.user;

    const newReview = {
      reviews: [
        {
          reviewer_name: user?.name || "Anonymous",
          reviewer_rating: formData.reviewer_rating,
          comment: formData.comment,
        },
      ],
    };

    await api.patch(`/headsets/${formData.productId}`, newReview);
    await thunkAPI.dispatch(fetchAllVrHeadsets());
    localStorage.removeItem("vrHeadsets");
    localStorage.removeItem("vrHeadsetsCacheTime");
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to add review");
  }
});
