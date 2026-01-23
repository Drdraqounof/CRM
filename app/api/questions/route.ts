import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

// Hardcoded admin emails
const adminEmails = [
  "rob@launchpadphilly.org",
  "sanaa@launchpadphilly.org",
  "taheera@launchpadphilly.org",
];

// GET - Get all survey questions
export async function GET() {
  try {
    const questions = await prisma.surveyQuestion.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('GET /api/questions error:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

// POST - Create a new survey question (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = adminEmails.includes(session.user.email);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { question, type, options, required, order, category, isActive } = body;

    if (!question || !type) {
      return NextResponse.json({ error: 'Question and type are required' }, { status: 400 });
    }

    // Get the highest order number to auto-increment
    const lastQuestion = await prisma.surveyQuestion.findFirst({
      orderBy: { order: 'desc' },
    });
    const newOrder = order ?? (lastQuestion ? lastQuestion.order + 1 : 0);

    const newQuestion = await prisma.surveyQuestion.create({
      data: {
        question,
        type,
        options: options ? JSON.stringify(options) : null,
        required: required ?? false,
        order: newOrder,
        category: category ?? 'general',
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('POST /api/questions error:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
