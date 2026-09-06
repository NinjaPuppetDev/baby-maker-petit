import { NextResponse } from 'next/server';
import {
  ACCESS_COOKIE,
  constantTimeEqual,
  createAccessToken,
  getSitePassword,
} from '@/lib/access';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body.password === 'string' ? body.password : '';

    if (!constantTimeEqual(password, getSitePassword())) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: ACCESS_COOKIE,
      value: await createAccessToken(),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to verify password' }, { status: 400 });
  }
}
