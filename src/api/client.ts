import { getToken } from '../lib/storage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestOptions = {
  method?: HTTPMethod;
  body?: unknown;
  auth?: boolean;
};

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, auth = true } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      headers['X-Noroff-API-Key'] = API_KEY;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.errors?.[0].message ||
      data?.message ||
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}
