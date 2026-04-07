import type { Usuario } from './usuario';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: Usuario;
}
