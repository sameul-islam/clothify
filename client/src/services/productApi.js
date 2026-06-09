import api from "./axios";

/**
 * Get all products with filters, search, sort, pagination
 * Example params:
 * {
 *   featured: true,
 *   gender: "men",
 *   search: "dress",
 *   sort: "price-low",
 *   page: 1,
 *   limit: 12,
 *   minPrice: 1000,
 *   maxPrice: 5000
 * }
 */
export const fetchProducts = async (params) => {
  const res = await api.get("/products", {
    params,
  });

  return res.data;
};