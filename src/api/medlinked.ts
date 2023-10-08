import axios from "axios";

export const medlinked = axios.create({
  baseURL: "http://localhost:8080/medlinked-service/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
  },
});
