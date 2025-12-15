import { NextResponse } from 'next/server';

// List of paths that don't require authentication
const authExemptPaths = ['/login', '/registration', '/forgot-password', '/reset-password','/va-calculators', '/va-rating-calculator', '/va-back-pay-calculator', '/ai-assistant'];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get('user_access_token')?.value;

  // Allow access to auth-exempt paths
  if (authExemptPaths.some(exemptPath => path.startsWith(exemptPath))) {
    // If user is already logged in, redirect to dashboard
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // For all other paths, require authentication
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except _next, api, and static files
    '/((?!_next/|api/|.*\\.).*)' 
  ],
};
