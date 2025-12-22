


import { 
  Users, 
  DollarSign, 
  TrendingUp,
  UserPlus,
  UserX,
  Target
} from 'lucide-react';


import Link from 'next/link';
import { prisma } from '../../lib/prisma';

function getMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export default async function Home() {

  // Fetch donors
  const donors: any[] = await prisma.donor.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Fetch all campaigns
  const campaigns: any[] = await prisma.campaign.findMany({
    orderBy: { startDate: 'desc' },
  });

  // Nonprofit CRM rules
  const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
  const now = Date.now();

  let totalDonors = 0;
  let activeDonors = 0;
  let lapsedDonors = 0;
  let majorDonors = 0;

  donors.forEach((donor: any) => {
    if (!donor.lastDonation) return; // Only count donors who have donated
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

  // Top donors by totalDonated
  const topDonors = donors
    .sort((a: any, b: any) => (b.totalDonated || 0) - (a.totalDonated || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <h2 className="font-semibold text-lg">Donor Management System</h2>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/dashboard" className="px-4 py-2 rounded-lg transition-colors bg-blue-600 text-white">Dashboard</Link>
            <Link href="/donor-list" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100">Donors</Link>
            <Link href="/campaigns" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100">Campaigns</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Donors */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Donors</p>
              <p className="text-2xl font-bold mb-1">{totalDonors}</p>
            </div>
            {/* Active Donors */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-2xl font-bold mb-1">{activeDonors}</p>
            </div>
            {/* Major Donors */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Major Donors</p>
              <p className="text-2xl font-bold mb-1">{majorDonors}</p>
            </div>
            {/* Lapsed Donors */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserX className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Lapsed</p>
              <p className="text-2xl font-bold mb-1">{lapsedDonors}</p>
            </div>
          </div>

          {/* All Campaigns Section (debug) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold">All Campaigns </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Showing all campaigns. Check status and date fields below.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {campaigns.map(campaign => {
                const percentage = (campaign.raised / campaign.goal) * 100;
                return (
                  <div key={campaign.id} className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="font-semibold mb-4">{campaign.name}</h3>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()} goal
                        </span>
                        <span className="font-semibold">{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <div>Status: <span className="font-mono">{campaign.status}</span></div>
                      <div>Start: <span className="font-mono">{campaign.startDate?.toLocaleDateString?.() || String(campaign.startDate)}</span></div>
                      <div>End: <span className="font-mono">{campaign.endDate?.toLocaleDateString?.() || String(campaign.endDate)}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Donors Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-1">Top Donors</h2>
            <p className="text-sm text-gray-600 mb-4">By total giving</p>
            <div className="space-y-3">
              {topDonors.map(donor => (
                <div key={donor.id} className="flex justify-between items-start py-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{donor.name}</p>
                    <p className="text-sm text-gray-500">{donor.email}</p>
                  </div>
                  <p className="font-semibold text-lg">${(donor.totalDonated || 0).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-1">Donor Management System © 2025</p>
          <p>Data is live from your database.</p>
        </div>
      </footer>
    </div>
  );
}