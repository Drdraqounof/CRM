
// This file is a Server Component. All data fetching and logic that requires server-side resources (like Prisma) must be done here.
// We cannot use dynamic imports with ssr: false or any client-only logic directly in a Server Component.
// To render client-side interactivity, we pass the fetched data as props to a Client Component (DashboardPageClientWrapper).
// DashboardPageClientWrapper handles the dynamic import of the actual dashboard UI and is marked with 'use client'.

import { prisma } from '../../lib/prisma';
import DashboardPageClientWrapper from './DashboardPageClientWrapper';

export default async function Home() {
  // Fetch donors
  const donors: any[] = await prisma.donor.findMany({ orderBy: { createdAt: 'desc' } });
  // Fetch all campaigns
  const campaigns: any[] = await prisma.campaign.findMany({ orderBy: { startDate: 'desc' } });
  // Nonprofit CRM rules
  const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
  const now = Date.now();
  let totalDonors = 0, activeDonors = 0, lapsedDonors = 0, majorDonors = 0;
  donors.forEach((donor: any) => {
    if (!donor.lastDonation) return;
    totalDonors++;
    const lastDonationTime = new Date(donor.lastDonation).getTime();
    const isActive = now - lastDonationTime < ONE_YEAR;
    const isMajor = (donor.totalDonated || 0) >= 5000;
    if (isActive) {
      activeDonors++;
      if (isMajor) majorDonors++;
    } else {
      lapsedDonors++;
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