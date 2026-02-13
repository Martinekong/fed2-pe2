import { request } from './client';

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

export type AuthUser = AuthResponse['data'];

export type AuthResponse = {
  data: {
    name: string;
    email: string;
    accessToken: string;
  };
};

export async function login(input: LoginInput): Promise<AuthUser> {
  const res = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: input,
    auth: false,
  });

  return res.data;
}

export async function register(input: RegisterInput): Promise<AuthUser> {
  const res = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: input,
    auth: false,
  });

  return res.data;
}
