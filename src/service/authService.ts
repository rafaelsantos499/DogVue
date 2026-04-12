import type { LoginPayload, RegisterPayload } from '@/models/Login';
import type { AuthResponse } from '@/models/Auth';
import type { Usuario } from '@/models/usuario';
import { apiService, setAuthHeader } from './apiService';
import { tokenService } from './tokenService';

// Shape bruta retornada por /auth/login e /auth/register
interface LoginApiResponse {
  token?: string;
  access_token?: string;
  refresh_token?: string;
  user: Usuario;
}

function normalizeAuthResponse(raw: LoginApiResponse): AuthResponse {
  const normalized = {
    access_token: raw.access_token ?? raw.token ?? '',
    refresh_token: raw.refresh_token ?? '',
    token_type: 'Bearer',
    expires_in: 3600,
    user: raw.user,
  };
  console.debug('[authService] raw response:', raw);
  console.debug('[authService] normalized access_token:', normalized.access_token);
  return normalized;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const raw = await apiService.post<LoginApiResponse>('/auth/register', payload);
    return normalizeAuthResponse(raw);
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const raw = await apiService.post<LoginApiResponse>('/auth/login', payload);
    return normalizeAuthResponse(raw);
  },

  async me(): Promise<Usuario> {
    const raw = await apiService.get<{ user: Usuario } | Usuario>('/auth/me');
    // Suporte a backends que retornam { user: {...} } e aos que retornam o objeto direto
    if (raw && typeof (raw as { user?: unknown }).user === 'object' && (raw as { user?: unknown }).user !== null) {
      return (raw as { user: Usuario }).user;
    }
    return raw as Usuario;
  },

  // Alias mantido para compatibilidade com store existente
  async validate(): Promise<AuthResponse> {
    const user = await this.me();
    return { access_token: '', refresh_token: '', token_type: 'Bearer', expires_in: 0, user };
  },

  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
    tokenService.clearTokens();
    setAuthHeader(null);
  },

  async loginWithFirebase(idToken: string): Promise<AuthResponse> {
    const raw = await apiService.post<LoginApiResponse>('/auth/firebase', { id_token: idToken });
    return normalizeAuthResponse(raw);
  },

  // Alias mantido para compatibilidade com store e firebase
  async loginGoogle(idToken: string): Promise<AuthResponse> {
    return this.loginWithFirebase(idToken);
  },

  saveToken(accessToken: string, refreshToken?: string): void {
    tokenService.saveTokens(accessToken, refreshToken);
    setAuthHeader(tokenService.getToken());
  },

  removeToken(): void {
    tokenService.clearTokens();
  },
};

