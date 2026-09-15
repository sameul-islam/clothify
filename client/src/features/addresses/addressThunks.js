import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../services/addressApi";

export const getAddresses = createAsyncThunk(
  "addresses/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAddresses();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const data = await createAddress(addressData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const data = await updateAddress(id, addressData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update address",
      );
    }
  },
);

export const removeAddress = createAsyncThunk(
  "addresses/removeAddress",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteAddress(id);

      return {
        ...data,
        deletedId: id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

export const makeDefaultAddress = createAsyncThunk(
  "addresses/makeDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const data = await setDefaultAddress(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to set default address",
      );
    }
  },
);