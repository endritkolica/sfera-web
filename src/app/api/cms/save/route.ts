import { NextRequest, NextResponse } from 'next/server';
import { saveContent } from '@/lib/content';

export const runtime = 'nodejs';

// Sanitize: strip all HTML tags to prevent XSS stored in content.json
function sanitize(val: unknown): unknown {
  if (typeof val === 'string') {
    return val.replace(/<[^>]*>/g, '').trim();
  }
  if (Array.isArray(val)) return val.map(sanitize);
  if (val && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val).map(([k, v]) => [k, sanitize(v)])
    );
  }
  return val;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const clean = sanitize(body);

  try {
    await saveContent(clean);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Save failed:', err);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
