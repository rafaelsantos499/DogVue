import axios from "axios";
import type { Login } from "@/models/Login";

const axiosPadrao = axios.create({
  baseURL: "http://localhost:8000/api/",
});

axiosPadrao.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const apiService = {
  post(endpoint: string, body: any) {
    return axiosPadrao.post(endpoint, body);
  },
  get(endpoint: string) {
    return axiosPadrao.get(endpoint);
  }, 
};
