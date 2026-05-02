import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback');

// In-memory rate limiting (resets on server restart — acceptable for solo use)
const attempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();

  // Check lockout
  const record = attempts.get(ip);
  if (record && record.lockedUntil > now) {
    const mins = Math.ceil((record.lockedUntil - now) / 60000);
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${mins} minute(s).` },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { username, password } = body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    const current = record ?? { count: 0, lockedUntil: 0 };
    current.count += 1;
    if (current.count >= MAX) {
      current.lockedUntil = now + LOCKOUT_MS;
      current.count = 0;
    }
    attempts.set(ip, current);
    const remaining = MAX - (current.count % MAX || MAX);
    return NextResponse.json(
      { error: `Invalid credentials. ${remaining} attempt(s) remaining.` },
      { status: 401 }
    );
  }

  // Success — clear attempts and issue JWT
  attempts.delete(ip);

  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4h')
    .sign(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('cms_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 4, // 4 hours
    path: '/',
  });
  return res;
}
