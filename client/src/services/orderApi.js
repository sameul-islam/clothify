import api from "./axios";

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);

  return res.data;
};