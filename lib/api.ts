import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // URL de tu backend NestJS
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (email: string, password: string) => {
  const response = await api.post("/auth/signup", { email, password });
  return response.data; // { access_token: "..." }
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // { access_token: "..." }
};
