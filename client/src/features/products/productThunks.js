import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchSingleProduct } from "../../services/productApi";

/**
 * Fetch products from backend with filters
 */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params, thunkAPI) => {
    try {
      const data = await fetchProducts(params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Fetch a single product by slug

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (slug, thunkAPI) => {
    try {
      const data = await fetchSingleProduct(slug);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  }
);