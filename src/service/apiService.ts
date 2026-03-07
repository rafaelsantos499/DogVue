import axios from "axios";
import { authService } from "./authService";

let refreshRequest: Promise<string | null> | null = null;

const axiosPadrao = axios.create({
  baseURL: "http://localhost:8000/api/",
});

async function refreshAccessToken(): Promise<string | null> {
  const storedRefreshToken = window.localStorage.getItem("refreshToken");

  if (!storedRefreshToken) {
    return null;
  }

  if (!refreshRequest) {
    refreshRequest = authService.refreshToken(storedRefreshToken)
      .then(( { access_token, refresh_token } ) => {
        const nextAccessToken = access_token as string | undefined;
        const nextRefreshToken = refresh_token as string | undefined;

        if (!nextAccessToken) {
          return null;
        }

        authService.saveToken(nextAccessToken, nextRefreshToken);

        if (nextRefreshToken) {
          window.localStorage.setItem("refreshToken", nextRefreshToken);
        }

        return nextAccessToken;
      })
      .catch(() => {
       authService.removeToken();
        return null;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

axiosPadrao.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPadrao.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      requestUrl.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const nextAccessToken = await refreshAccessToken();

    if (!nextAccessToken) {
      return Promise.reject(error);
    }

    originalRequest.headers = originalRequest.headers || {};
    originalRequest.headers.Authorization = "Bearer " + nextAccessToken;

    return axiosPadrao(originalRequest);
  }
);

export const apiService = {
  post(endpoint: string, body: any, config?: any) {
    return axiosPadrao.post(endpoint, body, config);
  },
  get(endpoint: string) {
    return axiosPadrao.get(endpoint);
  }, 
};
