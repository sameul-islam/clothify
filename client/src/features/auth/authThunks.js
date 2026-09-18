import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  fetchCurrentUser,
  updateProfile,
  updatePassword,
} from "../../services/authApi";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const data = await loginUser(loginData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Authentication failed"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await updateProfile(profileData);

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const data = await updatePassword(passwordData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password",
      );
    }
  },
);