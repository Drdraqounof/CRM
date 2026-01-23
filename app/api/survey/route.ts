import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

// POST - Save survey response
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const { userType, usedCRM, crmPurpose, interests, crmComfort, orgName, orgRole } = body;

    // Upsert - update if exists, create if not
    const existingResponse = await prisma.surveyResponse.findFirst({
      where: { userId: user.id },
    });

    let surveyResponse;
    if (existingResponse) {
      surveyResponse = await prisma.surveyResponse.update({
        where: { id: existingResponse.id },
        data: {
          userType,
          usedCRM,
          crmPurpose,
          interests,
          crmComfort,
          orgName,
          orgRole,
        },
      });
    } else {
      surveyResponse = await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          userType,
          usedCRM,
          crmPurpose,
          interests,
          crmComfort,
          orgName,
          orgRole,
        },
      });
    }

    return NextResponse.json(surveyResponse, { status: 200 });
  } catch (error) {
    console.error('POST /api/survey error:', error);
    return NextResponse.json({ error: 'Failed to save survey response' }, { status: 500 });
  }
}

// GET - Get all survey responses (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Hardcoded admin emails
    const adminEmails = [
      "rob@launchpadphilly.org",
      "sanaa@launchpadphilly.org",
      "taheera@launchpadphilly.org",
    ];
    
    const isAdmin = adminEmails.includes(session.user.email);

    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const responses = await prisma.surveyResponse.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    console.error('GET /api/survey error:', error);
    return NextResponse.json({ error: 'Failed to fetch survey responses' }, { status: 500 });
  }
}
