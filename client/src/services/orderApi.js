import api from "./axios";

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);

  return res.data;
};

export const fetchSingleOrder = async (id) => {
  const res = await api.get(`/orders/${id}`);

  return res.data;
};


export const fetchMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};