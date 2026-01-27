"use client"

import { useRouter } from "next/navigation"
import { 
  Database, 
  Shield, 
  Zap,
  Users,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export default function FeaturesPage() {
  const router = useRouter()

  const additionalFeatures = [
    { icon: Shield, title: "Secure Data Storage", description: "Enterprise-grade security for all your sensitive donor information" },
    { icon: Zap, title: "Fast Performance", description: "Lightning-fast load times and responsive interface" },
    { icon: Users, title: "Team Collaboration", description: "Work together with role-based access and shared views" },
    { icon: Database, title: "Data Import/Export", description: "Easily migrate data from other platforms or export for analysis" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bondary
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push("/")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => router.push("/features")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => router.push("/build")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Build
              </button>
              <button
                onClick={() => router.push("/about")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                About Us
              </button>
              <button
                onClick={() => router.push("/login")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Platform Features
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Manage Relationships
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful features designed to help you build stronger connections with your donors and run successful campaigns
          </p>
        </div>

        {/* Big Demo Button */}
        <div className="flex justify-center mb-20">
          <Button 
            onClick={() => router.push("/demo")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-2xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            Start Interactive Demo
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>

        {/* Additional Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">And Much More</h3>
            <p className="text-slate-600">Additional capabilities to power your organization</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index}
                  className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 rounded-xl text-center"
                >
                  <div className="inline-flex p-3 rounded-xl bg-slate-100 mb-4">
                    <Icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Join organizations already using Bondary CRM to strengthen their donor relationships and grow their impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => router.push("/demo")}
                className="bg-white/10 border border-white/30 text-white hover:bg-white/20 text-lg px-8 py-3"
              >
                View Overview
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
