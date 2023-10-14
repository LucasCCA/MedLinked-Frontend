import axios from "axios";
import Cookies from "js-cookie";

export const medlinked = axios.create({
  baseURL: "http://localhost:8080/medlinked-service/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
  },
});

medlinked.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const auth = token ? `Bearer ${token}` : "";
    config.headers.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error),
);
