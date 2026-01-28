"use client";
import React, { useState } from "react";
import { Users, DollarSign, TrendingUp, UserPlus, UserX, Target, Sparkles, Settings, LogOut, Shield, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../../lib/useTheme';

export default function DashboardPageClient({ donors, campaigns, topDonors, totalDonors, activeDonors, lapsedDonors, majorDonors }: any) {
  const { data: session } = useSession();
  const { themeConfig } = useTheme();
  const [showDesc, setShowDesc] = useState<{ open: boolean; donor?: any }>({ open: false });
  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content with sidebar offset */}
      <div className="ml-64 transition-all duration-300">
        {/* Main content */}
        <main className="p-8">
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${themeConfig.text}`}>Dashboard</h1>
            <p className={`${themeConfig.textSecondary}`}>Welcome back, {session?.user?.name || "User"}</p>
          </div>

          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Donors */}
              <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Total Donors</p>
                <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{totalDonors}</p>
              </div>
              {/* Active Donors */}
              <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Active</p>
                <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{activeDonors}</p>
              </div>
              {/* Major Donors */}
              <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Major Donors</p>
                <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{majorDonors}</p>
              </div>
              {/* Lapsed Donors */}
              <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <UserX className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Lapsed</p>
                <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{lapsedDonors}</p>
              </div>
            </div>

            {/* All Campaigns Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className={`h-5 w-5 ${themeConfig.text}`} />
                <h2 className={`text-xl font-semibold ${themeConfig.text}`}>All Campaigns</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {campaigns.map((campaign: any) => {
                  const percentage = (campaign.raised / campaign.goal) * 100;
                  return (
                    <div key={campaign.id} className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
                      <h3 className={`font-semibold mb-4 ${themeConfig.text}`}>{campaign.name}</h3>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className={`${themeConfig.textSecondary}`}>
                            ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()} goal
                          </span>
                          <span className="font-semibold">{Math.round(percentage)}%</span>
                        </div>
                        <div className={`w-full ${themeConfig.accent} rounded-full h-2.5`}>
                          <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                          campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Donors Section */}
            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-1 ${themeConfig.text}`}>Top Donors</h2>
              <p className={`text-sm ${themeConfig.textSecondary} mb-4`}>By total giving</p>
              <div className="space-y-3">
                {topDonors.map((donor: any) => (
                  <div key={donor.id} className={`flex justify-between items-start py-3 border-b last:border-0 ${themeConfig.border}`}>
                    <div className="flex-1">
                      <p className={`font-medium ${themeConfig.text}`}>{donor.name}</p>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>{donor.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className={`font-semibold text-lg ${themeConfig.text}`}>${(donor.totalDonated || 0).toLocaleString()}</p>
                      <button
                        className="text-blue-600 hover:underline text-xs px-2 py-1 rounded"
                        onClick={() => setShowDesc({ open: true, donor })}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
                {/* Overlay for donor description */}
                {showDesc.open && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowDesc({ open: false })}>
                    <div className={`${themeConfig.surface} rounded-lg p-6 max-w-sm w-full shadow-lg relative`} onClick={e => e.stopPropagation()}>
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowDesc({ open: false })}>&times;</button>
                      <h3 className={`text-xl font-bold mb-4 ${themeConfig.text}`}>Donor Description</h3>
                      <div className={`mb-2 ${themeConfig.text}`}>
                        <span className="font-semibold">Name:</span> {showDesc.donor?.name}
                      </div>
                      <div className={`mb-2 ${themeConfig.text}`}>
                        <span className="font-semibold">Email:</span> {showDesc.donor?.email}
                      </div>
                      <div className={`mb-2 ${themeConfig.text}`}>
                        <span className="font-semibold">Description:</span>
                        <div className={`${themeConfig.textSecondary} mt-1 whitespace-pre-line`}>{showDesc.donor?.description || "No description provided."}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`border-t ${themeConfig.border} ${themeConfig.surface} py-6`}>
          <div className={`px-8 text-center text-sm ${themeConfig.textSecondary}`}>
            <p className="mb-1">Bondary CRM © 2025</p>
            <p>Data is live from your database.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}