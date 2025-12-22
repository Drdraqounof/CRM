"use client";

import dynamic from 'next/dynamic';

const DashboardPageClient = dynamic(() => import('./DashboardPageClient'), { ssr: false }) as React.ComponentType<{
  donors: any[];
  campaigns: any[];
  topDonors: any[];
  totalDonors: number;
  activeDonors: number;
  lapsedDonors: number;
  majorDonors: number;
}>;

export default function DashboardPageClientWrapper(props: {
  donors: any[];
  campaigns: any[];
  topDonors: any[];
  totalDonors: number;
  activeDonors: number;
  lapsedDonors: number;
  majorDonors: number;
}) {
  return <DashboardPageClient {...props} />;
}
