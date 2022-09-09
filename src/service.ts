import axios from "axios";
import type { Login } from "@/models/Login";

const axiosPadrao = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json/",
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

export const api = {
  post(endpoint: string, body: any) {
    return axiosPadrao.post(endpoint, body);
  },
  get(endpoint: string) {
    return axiosPadrao.get(endpoint);
  },
  login(body: Login) {
    return axios.post(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      body
    );
  },
  validate() {
    return axiosPadrao.post(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token/validate"
    );
  },
};
