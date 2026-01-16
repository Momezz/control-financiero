"use client";

import { NextResponse, NextRequest } from 'next/server';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setAccessToken, clearAuth } from '@/redux/features/auth/authSlice';

export default function AuthInitializer() {
  const URI = process.env.NEXT_PUBLIC_BASE_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(
          `${URI}/auth/me`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        dispatch(setUser(data.user));
        dispatch(setAccessToken("valid"));
      } catch {
        dispatch(clearAuth());
      }
    }
    init();
  }, [dispatch]);
  return null;
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
};
