import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VRHeadset } from "../types";
import { RootState } from "../store";

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

interface ReviewFormData {
  comment: string;
  reviewer_rating: number;
  productId: string;
}

interface NewReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface UpdatedProductData {
  reviews: NewReview[];
}

export const fetchAllVrHeadsets = createAsyncThunk<
  FetchHeadsetsResponse,
  void,
  { rejectValue: FetchHeadsetsError }
>("virtualHeadsets/fetchVirtualHeadsets", async (_, thunkAPI) => {
  const END_POINT = "/headsets";
  const url = BASE_URL + END_POINT;
  try {
    const response = await axios.get<ApiResponse>(url);
    const sortedData = response.data.data.data.sort(
      (a, b) => a.order - b.order
    );
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
  const END_POINT = `/headsets/${formData.productId}`;
  const url = BASE_URL + END_POINT;

  const user = (thunkAPI.getState() as RootState).auth.user;

  try {
    const newReview = {
      reviews: [
        {
          reviewer_name: user?.name || "Anonymous",
          reviewer_rating: formData.reviewer_rating,
          comment: formData.comment,
        },
      ],
    };

    await axios.patch(url, newReview);
    await thunkAPI.dispatch(fetchAllVrHeadsets());
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to add review");
  }
});
