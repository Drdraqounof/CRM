import { NextResponse } from 'next/server';

// Mock user for demonstration
const MOCK_USER = {
  email: 'user@example.com',
  password: 'password123', // In production, use hashed passwords!
  id: 1,
  name: 'Demo User',
};

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Simple mock validation
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Create a mock session token (in production, use JWT or secure cookies)
      const token = Buffer.from(`${MOCK_USER.id}:${Date.now()}`).toString('base64');
      // Set a cookie for the session (httpOnly for security)
      const response = NextResponse.json({ success: true, token });
      response.cookies.set('session_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
