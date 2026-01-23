"use client"

import { useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  MessageSquare, 
  ArrowRight,
  Play
} from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

export default function DemoPage() {
  const router = useRouter()

  const demos = [
    {
      title: "Interactive Dashboard",
      description: "See real-time analytics, KPIs, and activity feeds in action",
      icon: LayoutDashboard,
      color: "from-blue-500 to-cyan-500",
      href: "/demo/dashboard"
    },
    {
      title: "Donor Management",
      description: "Explore donor profiles, donation history, and segmentation",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      href: "/demo/donors"
    },
    {
      title: "Campaign Tracking",
      description: "Create and monitor fundraising campaigns with live progress",
      icon: Target,
      color: "from-orange-500 to-red-500",
      href: "/demo/campaigns"
    },
    {
      title: "AI Chat Assistant",
      description: "Chat with our AI to see how it can help manage your CRM",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      href: "/demo/ai-chat"
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Play className="w-4 h-4 inline mr-2" />
          Interactive Demos
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Experience{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Bondary CRM
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Explore our features with interactive demos. No sign-up required.
        </p>
      </div>

      {/* Demo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demos.map((demo, index) => {
          const Icon = demo.icon
          return (
            <Card 
              key={index}
              className="p-6 bg-white/90 backdrop-blur-md border-slate-200/50 hover:shadow-2xl transition-all duration-300 rounded-2xl group hover:-translate-y-1 cursor-pointer"
              onClick={() => router.push(demo.href)}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${demo.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{demo.title}</h3>
              <p className="text-slate-600 mb-4">{demo.description}</p>
              <Button 
                className="w-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent transition-all"
              >
                Try Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-slate-600 mb-4">Ready to use the full platform?</p>
        <Button 
          onClick={() => router.push("/login")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 text-lg"
        >
          Start Free Trial
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
