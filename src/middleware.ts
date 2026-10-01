import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'secret_session';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect secret routes
  if (path.startsWith('/secret')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      // Redirect to home without exposing that secret routes exist
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/secret/:path*'],
};
