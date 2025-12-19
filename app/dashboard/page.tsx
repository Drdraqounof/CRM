
'use client';

import { 
  Users, 
  DollarSign, 
  TrendingUp,
  UserPlus,
  UserX,
  Target
} from 'lucide-react';

import Link from 'next/link';

// Types
interface Donor {
  id: string;
  name: string;
  email: string;
  totalDonated: number;
}

interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
}

interface Campaign {
  id: string;
  name: string;
  goal: number;
  raised: number;
}

// Mock Data
const mockDonors: Donor[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', totalDonated: 15000 },
  { id: '2', name: 'Jennifer Williams', email: 'jwilliams@email.com', totalDonated: 12000 },
  { id: '3', name: 'Michael Chen', email: 'mchen@email.com', totalDonated: 8500 },
  { id: '4', name: 'David Thompson', email: 'dthompson@email.com', totalDonated: 5000 },
  { id: '5', name: 'Robert Martinez', email: 'rmartinez@email.com', totalDonated: 3500 },
  { id: '6', name: 'Emily Rodriguez', email: 'erodriguez@email.com', totalDonated: 250 },
];

const mockDonations: Donation[] = [
  { id: '1', donorName: 'Sarah Johnson', amount: 500, date: '11/14/2024' },
  { id: '2', donorName: 'Michael Chen', amount: 1000, date: '10/19/2024' },
  { id: '3', donorName: 'Jennifer Williams', amount: 2000, date: '11/29/2024' },
  { id: '4', donorName: 'Emily Rodriguez', amount: 250, date: '11/30/2024' },
  { id: '5', donorName: 'Sarah Johnson', amount: 1000, date: '8/14/2024' },
];

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Holiday Campaign 2024', goal: 50000, raised: 35750 },
  { id: '2', name: 'Education Fund', goal: 100000, raised: 67500 },
];

export default function Home() {
  const totalDonors = 6;
  const activeDonors = 4;
  const newDonors = 1;
  const lapsedDonors = 1;
  const raisedThisMonth = 0;
  const donationsThisMonth = 0;

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
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-600">Overview of your fundraising activities</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Raised This Month</p>
              <p className="text-2xl font-bold mb-1">${raisedThisMonth.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{donationsThisMonth} donations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Donors</p>
              <p className="text-2xl font-bold mb-1">{totalDonors}</p>
              <p className="text-xs text-gray-500">{activeDonors} active</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserPlus className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">New Donors</p>
              <p className="text-2xl font-bold mb-1">{newDonors}</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserX className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Lapsed Donors</p>
              <p className="text-2xl font-bold mb-1">{lapsedDonors}</p>
              <p className="text-xs text-gray-500">Need follow-up</p>
            </div>
          </div>

          {/* Active Campaigns Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold">Active Campaigns</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Track progress toward your fundraising goals</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockCampaigns.map(campaign => {
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-1">Recent Donations</h2>
              <p className="text-sm text-gray-600 mb-4">Latest contributions received</p>
              <div className="space-y-3">
                {mockDonations.map(donation => (
                  <div key={donation.id} className="flex justify-between items-start py-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{donation.donorName}</p>
                      <p className="text-sm text-gray-500">{donation.date}</p>
                    </div>
                    <p className="font-semibold text-lg">${donation.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-1">Top Donors</h2>
              <p className="text-sm text-gray-600 mb-4">By total giving</p>
              <div className="space-y-3">
                {mockDonors.slice(0, 5).map(donor => (
                  <div key={donor.id} className="flex justify-between items-start py-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-sm text-gray-500">{donor.email}</p>
                    </div>
                    <p className="font-semibold text-lg">${donor.totalDonated.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-1">Donor Management System © 2025</p>
          <p>All data is currently mock data. Connect to a database for persistence.</p>
        </div>
      </footer>
    </div>
  );
}