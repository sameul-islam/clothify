import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productThunks";

const initialState = {
  products: [],
  loading: false,
  error: null,

  // pagination
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,

  // filters (UI state)
  filters: {
    search: "",
    gender: "",
    category: "",
    sort: "",
    minPrice: "",
    maxPrice: "",
    featured: false,
    bestSeller: false,
    newArrival: false,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;
