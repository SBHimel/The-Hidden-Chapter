import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const SECRET_EMAIL = process.env.SECRET_USER_EMAIL || 'secret@chapter.com';
const SECRET_PASSWORD = process.env.SECRET_USER_PASSWORD || 'chapter2026';

export const COOKIE_NAME = 'secret_session';

export interface UserPayload {
  email: string;
  authenticatedAt: number;
}

export function validateCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false;
  return (
    email.trim().toLowerCase() === SECRET_EMAIL.trim().toLowerCase() &&
    pass.trim() === SECRET_PASSWORD.trim()
  );
}

export function generateToken(email: string): string {
  const payload: UserPayload = {
    email,
    authenticatedAt: Date.now(),
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    return decoded;
  } catch {
    return null;
  }
}
