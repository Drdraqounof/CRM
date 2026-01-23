"use client"

import { useState } from "react"
import { Users, DollarSign, TrendingUp, UserX, Target, Sparkles, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardDemo() {
  const [showDesc, setShowDesc] = useState<{ open: boolean; donor?: any }>({ open: false })
  const [showSettings, setShowSettings] = useState(false)

  // Demo data
  const totalDonors = 127
  const activeDonors = 89
  const majorDonors = 12
  const lapsedDonors = 38

  const campaigns = [
    {
      id: 1,
      name: "Annual Giving Campaign 2024",
      goal: 100000,
      raised: 78500,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-03-31"
    },
    {
      id: 2,
      name: "Emergency Relief Fund",
      goal: 50000,
      raised: 52300,
      status: "completed",
      startDate: "2024-01-15",
      endDate: "2024-02-15"
    },
    {
      id: 3,
      name: "Youth Education Initiative",
      goal: 75000,
      raised: 23400,
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-06-30"
    },
    {
      id: 4,
      name: "Building Expansion Project",
      goal: 500000,
      raised: 125000,
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-12-31"
    },
  ]

  const topDonors = [
    { id: 1, name: "The Johnson Foundation", email: "contact@johnsonfoundation.org", totalDonated: 125000, description: "A family foundation focused on education and community development. Has been a major supporter since 2018." },
    { id: 2, name: "Tech Corp Inc.", email: "giving@techcorp.com", totalDonated: 89500, description: "Corporate partner providing both financial support and volunteer hours." },
    { id: 3, name: "Community Trust", email: "info@communitytrust.org", totalDonated: 67200, description: "Local community foundation supporting various nonprofits in the region." },
    { id: 4, name: "Sarah Williams", email: "sarah.w@email.com", totalDonated: 45000, description: "Individual major donor passionate about youth programs." },
    { id: 5, name: "Green Valley LLC", email: "donations@greenvalley.com", totalDonated: 38750, description: "Local business committed to giving back to the community." },
  ]

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
            <Link href="/demo/dashboard" className="px-4 py-2 rounded-lg transition-colors bg-blue-600 text-white">Dashboard</Link>
            <Link href="/demo/donors" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100">Donors</Link>
            <Link href="/demo/campaigns" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100">Campaigns</Link>
            <Link href="/demo/ai-chat" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              AI Writer
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 flex items-center gap-1"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <Link
                    href="/login"
                    className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Up / Login
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Demo Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">Demo Mode</span>
              <p className="text-amber-800">You&apos;re viewing sample data. Sign up to manage your own donors!</p>
            </div>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Get Started
            </Link>
          </div>

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

          {/* All Campaigns Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold">All Campaigns</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Showing all campaigns. Check status and date fields below.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {campaigns.map((campaign) => {
                const percentage = (campaign.raised / campaign.goal) * 100
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
                      <div>Start: <span className="font-mono">{campaign.startDate}</span></div>
                      <div>End: <span className="font-mono">{campaign.endDate}</span></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Donors Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-1">Top Donors</h2>
            <p className="text-sm text-gray-600 mb-4">By total giving</p>
            <div className="space-y-3">
              {topDonors.map((donor) => (
                <div key={donor.id} className="flex justify-between items-start py-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{donor.name}</p>
                    <p className="text-sm text-gray-500">{donor.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-lg">${donor.totalDonated.toLocaleString()}</p>
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
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg relative" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowDesc({ open: false })}>&times;</button>
                    <h3 className="text-xl font-bold mb-4">Donor Description</h3>
                    <div className="mb-2">
                      <span className="font-semibold">Name:</span> {showDesc.donor?.name}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Email:</span> {showDesc.donor?.email}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Description:</span>
                      <div className="text-gray-700 mt-1 whitespace-pre-line">{showDesc.donor?.description || "No description provided."}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-1">Donor Management System © 2025</p>
          <p>This is demo data. <Link href="/login" className="text-blue-600 hover:underline">Sign up</Link> to manage your own donors.</p>
        </div>
      </footer>
    </div>
  )
}
