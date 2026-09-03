import api from "./axios";

export const fetchProducts = async (params) => {
  const res = await api.get("/products", {
    params,
  });

  return res.data;
};