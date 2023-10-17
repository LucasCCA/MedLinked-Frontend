import { TokenData } from "@medlinked/types";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const medlinked = axios.create({
  baseURL: "http://localhost:8080/medlinked-service/",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  },
});

medlinked.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const auth =
      token && Date.now() < jwt_decode<TokenData>(token).exp * 1000
        ? `Bearer ${token}`
        : "";
    config.headers.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error),
);
