export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing donor id' }, { status: 400 });
    }
    await prisma.donor.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/donors error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete donor' }, { status: 500 });
  }
}
export async function GET() {
  try {
    const donors = await prisma.donor.findMany({ orderBy: { lastDonation: 'desc' } });
    return NextResponse.json(donors, { status: 200 });
  } catch (error) {
    console.error('GET /api/donors error:', error);
    return NextResponse.json({ error: 'Failed to fetch donors' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, totalDonated, lastDonation, status } = body;

    // Validate required fields
    if (!name || !email || !phone || totalDonated == null || !lastDonation || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate lastDonation date
    const parsedDate = new Date(lastDonation);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format for lastDonation. Use YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    // Create donor
    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        phone,
        totalDonated: Number(totalDonated),
        lastDonation: parsedDate,
        status,
      },
    });

    // Fetch the latest donor from Neon to ensure all fields are up to date
    const latestDonor = await prisma.donor.findUnique({ where: { id: donor.id } });
    return NextResponse.json(latestDonor, { status: 201 });

  } catch (error) {
    console.error('POST /api/donors error:', error);

    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
