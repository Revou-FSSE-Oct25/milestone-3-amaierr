'use server';

import { login as authLogin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export type LoginData = {
  email: string
  password: string
}

export async function loginAction(data: LoginData) {
  try {
    await authLogin(data);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function logoutAction() {
  await import('@/lib/auth').then(m => m.logout());
  redirect('/login');
}