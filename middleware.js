import { NextResponse } from 'next/server';

// List of paths that don't require authentication
const authExemptPaths = [
  '/',
  '/login',
  '/registration',
  '/forgot-password',
  '/reset-password',
  '/va-calculators',
  '/va-rating-calculator',
  '/va-back-pay-calculator',
  '/ai-assistant',
  // Same calculators as above, nested under /calculators (no login required)
  '/calculators/va-back-pay',
  '/calculators/va-rating',
  '/donate',
  '/terms-conditions',
  '/privacy-policy',
];

const authEntryPaths = ['/', '/login', '/registration'];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get('user_access_token')?.value;

  // Allow access to auth-exempt paths
  if (authExemptPaths.some((exemptPath) => path.startsWith(exemptPath))) {
    // Signed-in users skip the welcome/login/register entry screens
    if (accessToken && authEntryPaths.some((entryPath) => path === entryPath)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
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
