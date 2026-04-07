export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// Legacy aliases mantidos para compatibilidade
export type Login = LoginPayload;
export type CreaterUser = RegisterPayload;
