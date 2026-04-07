import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { tokenService } from './tokenService';

let refreshPromise: Promise<string | null> | null = null;

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
});

// ─── Request interceptor: injeta Bearer token em todas as requisições ────────
http.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = token;
  }
  return config;
});

// ─── Renovação silenciosa de token (singleton promise) ──────────────────────
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = http
      .post<{ access_token: string; refresh_token: string }>(
        '/auth/refresh',
        null,
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      )
      .then(({ data }) => {
        tokenService.saveTokens(data.access_token, data.refresh_token);
        return `Bearer ${data.access_token}`;
      })
      .catch(() => {
        tokenService.clearTokens();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

// ─── Response interceptor: retry automático em 401 ──────────────────────────
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      (original.url as string)?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    original._retry = true;
    const newToken = await refreshAccessToken();
    if (!newToken) return Promise.reject(error);

    original.headers = { ...original.headers, Authorization: newToken };
    return http(original);
  },
);

// ─── API pública tipada ───────────────────────────────────────────────────────
export const apiService = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.get<T>(url, config).then((r) => r.data);
  },
  post<T = unknown>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return http.post<T>(url, body, config).then((r) => r.data);
  },
  put<T = unknown>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return http.put<T>(url, body, config).then((r) => r.data);
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.delete<T>(url, config).then((r) => r.data);
  },
};

