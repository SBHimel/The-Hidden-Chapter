import { NextResponse } from 'next/server';
import { validateCredentials, generateToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const isValid = validateCredentials(email, password);

    if (!isValid) {
      // Return subtle generic error so normal users don't suspect a secret
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. Access denied.' },
        { status: 401 }
      );
    }

    const token = generateToken(email);

    const response = NextResponse.json({
      success: true,
      message: 'Access granted. Welcome to the hidden chapter.',
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
