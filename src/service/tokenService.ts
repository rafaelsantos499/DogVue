const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  saveTokens(accessToken: string, refreshToken?: string): void {
    // Guard against double Bearer prefix
    const bearer = accessToken.startsWith('Bearer ')
      ? accessToken
      : `Bearer ${accessToken}`;
    localStorage.setItem(TOKEN_KEY, bearer);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
