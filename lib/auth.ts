import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';

// Middleware/guard for API routes
import type { NextRequest } from 'next/server';
export async function requireAuth(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session;
}

// HOC for server components/pages
export function withAuth(handler: (...args: any[]) => any) {
  return async (req: NextRequest, ...args: any[]) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, ...args, session);
  };
}
