import api from "./axios";

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await api.post("/auth/login", loginData);
  return res.data;
};

export const fetchCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};