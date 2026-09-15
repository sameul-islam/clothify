import api from "./axios";

export const fetchAddresses = async () => {
  const res = await api.get("/addresses");
  return res.data;
};

export const createAddress = async (addressData) => {
  const res = await api.post("/addresses", addressData);
  return res.data;
};

export const updateAddress = async (id, addressData) => {
  const res = await api.put(`/addresses/${id}`, addressData);
  return res.data;
};

export const deleteAddress = async (id) => {
  const res = await api.delete(`/addresses/${id}`);
  return res.data;
};

export const setDefaultAddress = async (id) => {
  const res = await api.patch(`/addresses/${id}/default`);
  return res.data;
};