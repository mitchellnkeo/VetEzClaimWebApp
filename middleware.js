import { NextResponse } from 'next/server';

const publicRoutes = [
  'buddy-statement',
  'login',
  'registration',
  'verify-account',
  'forgot-password',
  'reset-password',
];
// const privateRoutes = [""];
const privateRoutes = ['', 'profile'];

export function middleware(request, response) {
  let accessToken = request.cookies.get('user_access_token')?.value;
  const path = request.nextUrl.pathname;
  const firstRoutePath = path.substring(1).split('/')[0];

  if (!accessToken && privateRoutes.includes(firstRoutePath) && firstRoutePath != 'buddy-statemen' ) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (accessToken && publicRoutes.includes(firstRoutePath)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/buddy-statement',
    '/login',
    '/registration/:path*',
    '/verify-account/:path*',
    '/forgot-password',
    '/reset-password/:path*',
    '/profile/:path*',
  ],
};
