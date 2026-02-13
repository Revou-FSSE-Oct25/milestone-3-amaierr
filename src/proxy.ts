import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, User } from './lib/auth';
import axios from 'axios';

const PROTECTED_ROUTES = {
  '/profile': ['customer', 'admin'], 
  '/private': ['admin'],
} as const

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Check if user is authenticated
  const authCookie = request.cookies.get(AUTH_COOKIE);
  let user: User | null = null
  
  if (authCookie) {
    try {
      await axios.get<User>('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${authCookie.value}`
        }
      }).then((response) => {user = response.data})
    } catch {
      // Invalid cookie
    }
  }

  const isLoggedIn = !!user

  if (isLoggedIn && (pathname === '/login' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  // 3. Check for protected routes
  const protectedRouteKey = Object.keys(PROTECTED_ROUTES).find(route => 
    pathname.startsWith(route)
  )

  if (protectedRouteKey) {
    // If not logged in, redirect to login
    if (!isLoggedIn) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    // Role-based access control
    const allowedRoles = PROTECTED_ROUTES[protectedRouteKey as keyof typeof PROTECTED_ROUTES];
    if (user && !allowedRoles.includes(user.role as any)) {
      // User is logged in but doesn't have permission
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }
  }

  return NextResponse.next()
}