import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
