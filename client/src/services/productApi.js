import api from "./axios";

export const fetchProducts = async (params) => {
  const res = await api.get("/products", {
    params,
  });

  return res.data;
};

export const fetchSingleProduct = async (slug) => {
  const res = await api.get(`/products/${slug}`);

  return res.data;
};