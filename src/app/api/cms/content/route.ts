import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content';

export const runtime = 'nodejs';

export async function GET() {
  const content = getContent();
  if (!content) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  }
  return NextResponse.json(content);
}
