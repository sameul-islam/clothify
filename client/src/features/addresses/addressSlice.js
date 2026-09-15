import { createSlice } from "@reduxjs/toolkit";

import {
  getAddresses,
  addAddress,
  editAddress,
  removeAddress,
  makeDefaultAddress,
} from "./addressThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,

  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },

    clearAddresses: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Get addresses
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.addresses;
      })

      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newAddress = action.payload.address;

        state.items = [
          ...state.items.filter((item) => !newAddress.isDefault || !item.isDefault),
          newAddress,
        ];
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit address
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedAddress = action.payload.address;

        state.items = state.items.map((item) =>
          item._id === updatedAddress._id ? updatedAddress : item,
        );
      })

      .addCase(editAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete address
      .addCase(removeAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = state.items.filter(
          (item) => item._id !== action.payload.deletedId,
        );
      })

      .addCase(removeAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Set default address
      .addCase(makeDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(makeDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const defaultAddress = action.payload.address;

        state.items = state.items.map((item) => ({
          ...item,
          isDefault: item._id === defaultAddress._id,
        }));
      })

      .addCase(makeDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearAddressError,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;