import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-me'
);

// Routes that need auth
const PROTECTED_API = ['/api/cms/save', '/api/cms/content', '/api/cms/logout'];
const PROTECTED_PAGE = '/adminedit';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedApi = PROTECTED_API.some((p) => pathname.startsWith(p));
  const isProtectedPage = pathname === PROTECTED_PAGE;

  if (!isProtectedApi && !isProtectedPage) return NextResponse.next();

  const token = req.cookies.get('cms_token')?.value;

  if (!token) {
    if (isProtectedApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // For page: let it through — the page itself shows login form
    return NextResponse.next();
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    if (isProtectedApi) {
      const res = NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      res.cookies.delete('cms_token');
      return res;
    }
    const res = NextResponse.next();
    res.cookies.delete('cms_token');
    return res;
  }
}

export const config = {
  matcher: ['/adminedit', '/api/cms/:path*'],
};
