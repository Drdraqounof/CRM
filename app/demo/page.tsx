"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Database, ChevronRight, ArrowLeft, BarChart3, Users, Target, MessageSquare, Zap, TrendingUp, Gift, Calendar, PieChart } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export default function DemoPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showLiveDemo, setShowLiveDemo] = useState(false)

  const demoSteps = [
    {
      title: "Dashboard Overview",
      description: "Welcome to Bondary CRM! Start here to see your complete organization overview.",
      feature: "Interactive Dashboard",
      content: "View real-time analytics, recent activities, and key performance indicators all in one place. The dashboard adapts to your role and shows the most important metrics for your work.",
      icon: BarChart3,
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Real-time analytics update automatically as donors contribute",
        "Customizable widgets let you focus on what matters most",
        "Quick action buttons for common tasks",
        "Responsive design works on all devices"
      ]
    },
    {
      title: "Donor Management",
      description: "Manage your donor relationships with comprehensive profiles and history.",
      feature: "Donor Management",
      content: "Store detailed contact information, track donation history, and segment donors based on giving patterns and interests. Use this to personalize communications and identify major donor prospects.",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Complete donor profiles with contact details and preferences",
        "Full donation history and giving trends",
        "Smart segmentation for targeted outreach",
        "Notes and interaction logs for context",
        "Bulk operations for efficient management"
      ]
    },
    {
      title: "Campaign Tracking",
      description: "Create and monitor fundraising campaigns with detailed progress tracking.",
      feature: "Campaign Tracking",
      content: "Set campaign goals, track donations in real-time, and measure success with detailed reports. Monitor multiple campaigns simultaneously and adjust strategies based on live performance data.",
      icon: Target,
      color: "from-orange-500 to-red-500",
      highlights: [
        "Create campaigns with clear funding goals",
        "Real-time progress tracking towards targets",
        "Performance analytics and donor contribution insights",
        "Campaign-specific donor segments",
        "Success reports and ROI analysis"
      ]
    },
    {
      title: "AI Chat Assistant",
      description: "Get instant answers and automate tasks with our intelligent AI assistant.",
      feature: "AI Chat Assistant",
      content: "Ask questions about your donors, campaigns, and data. The AI provides insights, suggests actions, and can help automate repetitive tasks like follow-ups and data entry.",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Natural language questions about your data",
        "Instant insights and recommendations",
        "Suggest next best actions for donors",
        "Automate follow-up tasks and emails",
        "Available 24/7 for your team"
      ]
    },
    {
      title: "Team Collaboration",
      description: "Work efficiently with your team using role-based access and shared views.",
      feature: "Team Features",
      content: "Assign roles, control permissions, and enable team members to access only what they need. Share views, coordinate on campaigns, and maintain accountability with activity logs.",
      icon: Zap,
      color: "from-indigo-500 to-purple-500",
      highlights: [
        "Role-based access control (Admin, Manager, Staff)",
        "Shared views and workspaces",
        "Activity logs for audit trails",
        "Team permissions and data security",
        "Seamless collaboration tools"
      ]
    }
  ]

  const step = demoSteps[currentStep]
  const Icon = step.icon

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Launch live demo when on last step
      setShowLiveDemo(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Demo application data
  const dashboardMetrics = [
    { label: "Total Donors", value: "2,847", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Active Campaigns", value: "8", change: "+2", icon: Target, color: "from-orange-500 to-red-500" },
    { label: "Total Donations", value: "$245,890", change: "+18%", icon: Gift, color: "from-green-500 to-emerald-500" },
    { label: "Avg. Donation", value: "$86", change: "+5%", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
  ]

  const recentDonors = [
    { name: "Sarah Johnson", amount: "$5,000", date: "Today", campaign: "Building Fund" },
    { name: "Michael Chen", amount: "$2,500", date: "Yesterday", campaign: "Education Initiative" },
    { name: "Emily Rodriguez", amount: "$1,200", date: "2 days ago", campaign: "Community Health" },
    { name: "David Williams", amount: "$3,500", date: "3 days ago", campaign: "Building Fund" },
  ]

  const campaigns = [
    { name: "Building Fund", raised: "$125,000", goal: "$200,000", progress: 62 },
    { name: "Education Initiative", raised: "$89,500", goal: "$150,000", progress: 60 },
    { name: "Community Health", raised: "$31,390", goal: "$100,000", progress: 31 },
  ]

  // Live Demo Application
  if (showLiveDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Live Demo Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Interactive Dashboard Demo</h2>
            <p className="text-slate-600">Explore a fully functional demo of Bondary CRM. Click on elements to interact with them.</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardMetrics.map((metric, idx) => {
              const Icon = metric.icon
              return (
                <Card key={idx} className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-600 text-sm font-semibold">{metric.change}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                </Card>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Donors */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Donors</h3>
                <div className="space-y-4">
                  {recentDonors.map((donor, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-all cursor-pointer">
                      <div>
                        <p className="font-semibold text-slate-900">{donor.name}</p>
                        <p className="text-sm text-slate-600">{donor.campaign}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{donor.amount}</p>
                        <p className="text-sm text-slate-500">{donor.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Campaign Progress */}
            <div>
              <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Active Campaigns</h3>
                <div className="space-y-6">
                  {campaigns.map((campaign, idx) => (
                    <div key={idx} className="cursor-pointer hover:opacity-80 transition-all">
                      <div className="flex justify-between mb-2">
                        <p className="font-semibold text-slate-900 text-sm">{campaign.name}</p>
                        <p className="text-xs text-slate-600">{campaign.progress}%</p>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 transition-all duration-300"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-slate-600">{campaign.raised}</p>
                        <p className="text-xs text-slate-600">{campaign.goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Demo Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">Interactive overview</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore Bondary CRM features step by step. Learn how each feature helps you manage donors, track campaigns, and grow your organization's impact.
          </p>
        </div>

        {/* Demo Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Demo Area */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 h-full">
              <div className="mb-6">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} mb-6`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-2">{step.title}</h2>
                <p className="text-lg text-slate-600">{step.description}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
                <p className="text-slate-700 leading-relaxed text-lg mb-6">{step.content}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Learning Points:</h3>
                <ul className="space-y-3">
                  {step.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`p-1 rounded-full bg-gradient-to-r ${step.color} mt-1 flex-shrink-0`}>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="text-center">
                  <p className="text-slate-600 font-medium">
                    Step {currentStep + 1} of {demoSteps.length}
                  </p>
                </div>

                <button
                  onClick={nextStep}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === demoSteps.length - 1
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {currentStep === demoSteps.length - 1 ? "Try Live Demo" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>

          {/* Step Navigation Sidebar */}
          <div className="sticky top-0 h-fit">
            <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Demo Steps</h3>
              <div className="space-y-3">
                {demoSteps.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-full text-left p-4 rounded-lg font-medium transition-all ${
                      currentStep === idx
                        ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.feature}</span>
                      <span className="text-sm opacity-75">{idx + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Get Started CTA */}
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl mt-6">
              <h4 className="text-lg font-bold mb-2">Ready to Start?</h4>
              <p className="text-blue-100 text-sm mb-4">
                Try Bondary free for 14 days. No credit card required.
              </p>
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium"
              >
                Start Free Trial
              </Button>
            </Card>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Demo Progress</span>
            <span className="text-sm font-medium text-slate-700">
              {Math.round((currentStep + 1) / demoSteps.length * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
