
// This file is a Server Component. All data fetching and logic that requires server-side resources (like Prisma) must be done here.
// We cannot use dynamic imports with ssr: false or any client-only logic directly in a Server Component.
// To render client-side interactivity, we pass the fetched data as props to a Client Component (DashboardPageClientWrapper).
// DashboardPageClientWrapper handles the dynamic import of the actual dashboard UI and is marked with 'use client'.

import { prisma } from '../../lib/prisma';
import { mockDonors, mockCampaigns } from '../../lib/mock-data';
import DashboardPageClientWrapper from './DashboardPageClientWrapper';

export default async function Home() {
  let donors: any[] = [];
  let campaigns: any[] = [];

  // Fetch donors from database
  try {
    donors = await prisma.donor.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error('Failed to fetch donors from database:', error);
  }

  // Use mock data if database is empty
  if (donors.length === 0) {
    donors = mockDonors;
  }

  // Fetch campaigns from database
  try {
    campaigns = await prisma.campaign.findMany({ orderBy: { startDate: 'desc' } });
  } catch (error) {
    console.error('Failed to fetch campaigns from database:', error);
  }

  // Use mock campaigns if database is empty
  if (campaigns.length === 0) {
    campaigns = mockCampaigns;
  }

  // Nonprofit CRM rules
  let totalDonors = 0, activeDonors = 0, lapsedDonors = 0, majorDonors = 0;
  donors.forEach((donor: any) => {
    if (!donor.status) return;
    totalDonors++;
    if (donor.status === 'active') {
      activeDonors++;
    } else if (donor.status === 'lapsed') {
      lapsedDonors++;
    } else if (donor.status === 'major') {
      majorDonors++;
    }
  });
  const topDonors = donors
    .sort((a: any, b: any) => (b.totalDonated || 0) - (a.totalDonated || 0))
    .slice(0, 5);
  return (
    <DashboardPageClientWrapper
      donors={donors}
      campaigns={campaigns}
      topDonors={topDonors}
      totalDonors={totalDonors}
      activeDonors={activeDonors}
      lapsedDonors={lapsedDonors}
      majorDonors={majorDonors}
    />
  );
}