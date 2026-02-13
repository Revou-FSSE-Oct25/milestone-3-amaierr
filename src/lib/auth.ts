import { LoginData } from '@/app/login/actions';
import axios from 'axios';
import { cookies } from 'next/headers';

// TODO 1: Setup Mock Authentication
// Since we don't have a backend, we simulated it using Cookies.
// This file contains helpers to set, get, and remove the auth cookie.

export const AUTH_COOKIE = 'auth_token';

// Simple mock user interface
export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

interface Auth {
  access_token: string
  refresh_token: string
}

export async function login(data: LoginData) {
  var auth 
  await axios.post<Auth>('https://api.escuelajs.co/api/v1/auth/login', data)
        .then((response) => (auth = response.data))
        .catch((error) => {throw new Error(error.response.data.message)})

  // Create a session (mock)
  const cookieStore = await cookies();
  
  // Storing simple JSON in cookie for this demo
  cookieStore.set(AUTH_COOKIE, auth!.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return auth
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE);

  if (!token) return null;

  try {
    const response = await axios.get<User>('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    return response.data;
  } catch {
    return null;
  }
  
}