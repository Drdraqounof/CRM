"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  DollarSign,
  MoreVertical,
  Plus,
  Download,
  ChevronDown
} from "lucide-react"
import { Card } from "../../ui/card"
import { Button } from "../../ui/button"

export default function DonorsDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDonor, setSelectedDonor] = useState<number | null>(null)

  const donors = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      email: "sarah.johnson@email.com", 
      phone: "(555) 123-4567",
      location: "New York, NY",
      totalDonated: 15000, 
      lastDonation: "2024-01-15", 
      status: "active",
      donationCount: 12,
      segment: "Major Donor"
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      email: "m.chen@company.com", 
      phone: "(555) 234-5678",
      location: "San Francisco, CA",
      totalDonated: 8500, 
      lastDonation: "2024-01-10", 
      status: "active",
      donationCount: 8,
      segment: "Regular"
    },
    { 
      id: 3, 
      name: "Emily Davis", 
      email: "emily.d@email.com", 
      phone: "(555) 345-6789",
      location: "Chicago, IL",
      totalDonated: 25000, 
      lastDonation: "2024-01-08", 
      status: "active",
      donationCount: 24,
      segment: "Major Donor"
    },
    { 
      id: 4, 
      name: "Robert Wilson", 
      email: "rwilson@email.com", 
      phone: "(555) 456-7890",
      location: "Boston, MA",
      totalDonated: 3200, 
      lastDonation: "2023-06-20", 
      status: "lapsed",
      donationCount: 5,
      segment: "Regular"
    },
    { 
      id: 5, 
      name: "Lisa Anderson", 
      email: "lisa.a@email.com", 
      phone: "(555) 567-8901",
      location: "Seattle, WA",
      totalDonated: 12000, 
      lastDonation: "2024-01-05", 
      status: "active",
      donationCount: 15,
      segment: "Major Donor"
    },
    { 
      id: 6, 
      name: "James Taylor", 
      email: "jtaylor@company.com", 
      phone: "(555) 678-9012",
      location: "Austin, TX",
      totalDonated: 1800, 
      lastDonation: "2023-08-15", 
      status: "lapsed",
      donationCount: 3,
      segment: "New"
    },
  ]

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || donor.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Donor Management</h1>
          <p className="text-slate-600">Manage and track all your donor relationships</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
            <Plus className="w-4 h-4" />
            Add Donor
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6 bg-white border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search donors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "lapsed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600">Total Donors</p>
          <p className="text-2xl font-bold text-slate-900">{donors.length}</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600">Active Donors</p>
          <p className="text-2xl font-bold text-green-600">{donors.filter(d => d.status === "active").length}</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600">Lapsed Donors</p>
          <p className="text-2xl font-bold text-orange-600">{donors.filter(d => d.status === "lapsed").length}</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600">Total Raised</p>
          <p className="text-2xl font-bold text-slate-900">
            ${donors.reduce((sum, d) => sum + d.totalDonated, 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Donors Table */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Donor</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Total Donated</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Last Donation</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Segment</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor) => (
                <tr 
                  key={donor.id} 
                  className={`border-b border-slate-100 hover:bg-blue-50/50 transition-colors cursor-pointer ${
                    selectedDonor === donor.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedDonor(selectedDonor === donor.id ? null : donor.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                        {donor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{donor.name}</p>
                        <p className="text-sm text-slate-500">{donor.donationCount} donations</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {donor.email}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {donor.location}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-900">${donor.totalDonated.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600">{new Date(donor.lastDonation).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      donor.segment === "Major Donor" 
                        ? "bg-purple-100 text-purple-700"
                        : donor.segment === "New"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {donor.segment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      donor.status === "active" 
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Selected Donor Detail Panel */}
      {selectedDonor && (
        <Card className="mt-6 p-6 bg-white border-slate-200">
          {(() => {
            const donor = donors.find(d => d.id === selectedDonor)!
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" /> {donor.email}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" /> {donor.phone}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" /> {donor.location}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Donation Summary</h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-slate-600">
                      <DollarSign className="w-4 h-4" /> Total: ${donor.totalDonated.toLocaleString()}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" /> {donor.donationCount} donations
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" /> Last: {new Date(donor.lastDonation).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start bg-white text-slate-700 border border-slate-200 hover:bg-slate-50">
                      <Mail className="w-4 h-4 mr-2" /> Send Email
                    </Button>
                    <Button className="w-full justify-start bg-white text-slate-700 border border-slate-200 hover:bg-slate-50">
                      <DollarSign className="w-4 h-4 mr-2" /> Log Donation
                    </Button>
                  </div>
                </div>
              </div>
            )
          })()}
        </Card>
      )}
    </div>
  )
}
