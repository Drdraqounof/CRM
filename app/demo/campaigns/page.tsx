"use client"

import { useState } from "react"
import { 
  Target, 
  Plus, 
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle
} from "lucide-react"
import { Card } from "../../ui/card"
import { Button } from "../../ui/button"

export default function CampaignsDemo() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const campaigns = [
    {
      id: 1,
      name: "Annual Giving Campaign 2024",
      description: "Our flagship annual campaign to support core programs",
      goal: 100000,
      raised: 78500,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "active",
      donorCount: 245
    },
    {
      id: 2,
      name: "Emergency Relief Fund",
      description: "Rapid response funding for disaster relief",
      goal: 50000,
      raised: 52300,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "completed",
      donorCount: 189
    },
    {
      id: 3,
      name: "Youth Education Initiative",
      description: "Supporting educational programs for underprivileged youth",
      goal: 75000,
      raised: 23400,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      status: "active",
      donorCount: 87
    },
    {
      id: 4,
      name: "Building Expansion Project",
      description: "Capital campaign for new community center",
      goal: 500000,
      raised: 125000,
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      status: "active",
      donorCount: 156
    },
    {
      id: 5,
      name: "Spring Gala 2024",
      description: "Annual fundraising gala event",
      goal: 30000,
      raised: 0,
      startDate: "2024-04-15",
      endDate: "2024-04-15",
      status: "planned",
      donorCount: 0
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700"
      case "completed": return "bg-blue-100 text-blue-700"
      case "planned": return "bg-amber-100 text-amber-700"
      default: return "bg-slate-100 text-slate-700"
    }
  }

  const getProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campaign Tracking</h1>
          <p className="text-slate-600">Create, manage, and monitor your fundraising campaigns</p>
        </div>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Campaigns</p>
              <p className="text-xl font-bold text-slate-900">{campaigns.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Raised</p>
              <p className="text-xl font-bold text-slate-900">
                ${campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Campaigns</p>
              <p className="text-xl font-bold text-slate-900">
                {campaigns.filter(c => c.status === "active").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Donors</p>
              <p className="text-xl font-bold text-slate-900">
                {campaigns.reduce((sum, c) => sum + c.donorCount, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
              <button className="p-1 hover:bg-slate-100 rounded">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-2">{campaign.name}</h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{campaign.description}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-900">${campaign.raised.toLocaleString()}</span>
                <span className="text-slate-500">of ${campaign.goal.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    campaign.status === "completed" 
                      ? "bg-green-500" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-500"
                  }`}
                  style={{ width: `${getProgress(campaign.raised, campaign.goal)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {getProgress(campaign.raised, campaign.goal).toFixed(0)}% of goal
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{campaign.donorCount} donors</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 text-sm bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-3 py-1.5">
                <Edit className="w-3 h-3 mr-1" /> Edit
              </Button>
              <Button className="flex-1 text-sm bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-3 py-1.5">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
