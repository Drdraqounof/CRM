import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, goal, raised, startDate, endDate, status, description } = body;

    // Detailed logging for debugging
    console.log('POST /api/campaigns body:', body);

    // Validate required fields
    if (!name || goal == null || raised == null || !startDate || !endDate || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate date formats
    const parsedStart = new Date(startDate);
    const parsedEnd = new Date(endDate);
    if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format for startDate or endDate. Use YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    // Create campaign in Neon
    const campaign = await prisma.campaign.create({
      data: {
        name,
        goal: Number(goal),
        raised: Number(raised),
        startDate: parsedStart,
        endDate: parsedEnd,
        status,
        description,
      },
    });

    // Fetch the latest campaign from Neon to ensure all fields are up to date
    const latestCampaign = await prisma.campaign.findUnique({ where: { id: campaign.id } });
    return NextResponse.json(latestCampaign, { status: 201 });

  } catch (error) {
    console.error('POST /api/campaigns error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Campaign name already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({ orderBy: { startDate: 'desc' } });
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error('GET /api/campaigns error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}
