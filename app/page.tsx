"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Database, Users, Calendar, BarChart3, ChevronRight, Check, ArrowRight, Shield, Zap, MessageSquare, Target, Star, Quote, Play, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import ChatWidget from "./components/ChatWidget"

export default function BondaryCRM() {
  const [currentPage, setCurrentPage] = useState<"home" | "about">("home")
  const router = useRouter()

  // Render based on current page
  if (currentPage === "about") return <AboutPage setCurrentPage={setCurrentPage} router={router} />
  return (
    <HomePage
      setCurrentPage={setCurrentPage}
      router={router}
    />
  )
}

// Home Page
const HomePage = ({
  setCurrentPage,
  router
}: {
  setCurrentPage: (page: "home" | "about") => void;
  router: ReturnType<typeof import("next/navigation").useRouter>;
}) => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bondary
              </h1>
            </div>
            <div className="flex items-center space-x-6">
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
                onClick={() => setCurrentPage("about")}
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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Next-Generation CRM Platform
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 max-w-4xl mx-auto leading-tight text-balance tracking-tight">
              Transform Your Customer Relationships with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Bondary CRM
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              The intelligent platform for modern teams. Seamlessly manage contacts, automate workflows, and drive
              growth with powerful analytics.
            </p>
            {/* Embedded YouTube Video */}
            <div className="flex justify-center my-12">
              <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-4 border-white/30 hover:shadow-3xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-[1.02]">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/JGwtVbOz528"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-10 py-4 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 animate-bounce-x" />
              </Button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <Card className="p-6 bg-white/90 backdrop-blur-md border-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-bold text-slate-900">1,234</p>
                    <p className="text-sm text-slate-600 font-medium">Total Contacts</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white/90 backdrop-blur-md border-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-bold text-slate-900">87</p>
                    <p className="text-sm text-slate-600 font-medium">Active Deals</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white/90 backdrop-blur-md border-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-bold text-slate-900">24</p>
                    <p className="text-sm text-slate-600 font-medium">Tasks Today</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Powerful Features
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you manage relationships, track campaigns, and grow your organization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-blue-600 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Donor Management</h4>
              <p className="text-slate-600">Track all your donors, their history, and engagement in one place.</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-purple-600 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Campaign Tracking</h4>
              <p className="text-slate-600">Create and monitor fundraising campaigns with visual progress.</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-green-600 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">AI Assistant</h4>
              <p className="text-slate-600">Get instant help and insights with our built-in AI chat.</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-orange-600 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Analytics</h4>
              <p className="text-slate-600">Beautiful dashboards and reports to track your success.</p>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => router.push("/features")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-10 py-4 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-xl text-white font-semibold"
            >
              Explore All Features
              <ArrowRight className="w-5 h-5 ml-2 animate-bounce-x" />
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Simple Process
            </div>
            <h3 className="text-4xl font-bold mb-4">
              Get Started in Minutes
            </h3>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Setting up Bondary CRM is quick and easy. Follow these simple steps to transform your workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 relative">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/50">
                1
              </div>
              <h4 className="text-2xl font-bold mb-4">Create Account</h4>
              <p className="text-blue-200">Sign up with Google or email in seconds. No credit card required.</p>
              <div className="hidden md:block absolute top-12 right-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
            </div>
            <div className="text-center p-8 relative">
              <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-500/50">
                2
              </div>
              <h4 className="text-2xl font-bold mb-4">Import Data</h4>
              <p className="text-blue-200">Easily import your existing contacts and campaigns from any platform.</p>
              <div className="hidden md:block absolute top-12 right-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent" />
            </div>
            <div className="text-center p-8">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-purple-500/50">
                3
              </div>
              <h4 className="text-2xl font-bold mb-4">Start Growing</h4>
              <p className="text-blue-200">Launch campaigns, track donors, and watch your organization thrive.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Trusted by Many
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">
              What Our Users Say
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of organizations already using Bondary CRM to grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Bondary CRM transformed how we manage our donors. The dashboard gives us instant insights we never had before."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sarah Johnson</p>
                  <p className="text-sm text-slate-500">Executive Director, Hope Foundation</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              <p className="text-slate-700 mb-6 leading-relaxed">
                "The AI assistant is a game-changer. It's like having an extra team member who knows everything about our data."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Michael Chen</p>
                  <p className="text-sm text-slate-500">Development Manager, United Way</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Campaign tracking has never been easier. We hit our fundraising goals for the first time in years!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  ER
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Emily Rodriguez</p>
                  <p className="text-sm text-slate-500">Fundraising Lead, Green Earth</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="flex items-center gap-3 text-slate-600">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-slate-900">SOC 2 Compliant</p>
                <p className="text-sm">Enterprise Security</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Zap className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="font-semibold text-slate-900">99.9% Uptime</p>
                <p className="text-sm">Always Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-slate-900">10,000+ Users</p>
                <p className="text-sm">Growing Community</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <CheckCircle className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900">GDPR Ready</p>
                <p className="text-sm">Privacy First</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your CRM?
          </h3>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of organizations using Bondary CRM to build stronger relationships and achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-10 py-4 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-xl text-white font-semibold"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 animate-bounce-x" />
            </Button>
            <Button
              onClick={() => router.push("/features")}
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-4 rounded-xl font-semibold bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Bondary</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The intelligent CRM platform for modern organizations. Transform your customer relationships today.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-3 text-slate-400">
                <li><button onClick={() => router.push("/features")} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => router.push("/build")} className="hover:text-white transition-colors">How It's Built</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
                <li><button className="hover:text-white transition-colors">Integrations</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li><button onClick={() => router.push("/about")} className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-slate-400">
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors">Security</button></li>
                <li><button className="hover:text-white transition-colors">GDPR</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">© 2026 Bondary CRM. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <button className="text-slate-400 hover:text-white transition-colors">Twitter</button>
              <button className="text-slate-400 hover:text-white transition-colors">LinkedIn</button>
              <button className="text-slate-400 hover:text-white transition-colors">GitHub</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

const AboutPage = ({
  setCurrentPage,
  router
}: {
  setCurrentPage: (page: "home" | "about") => void;
  router: ReturnType<typeof import("next/navigation").useRouter>;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bondary
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage("home")}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </button>
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Login
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 text-balance">About Bondary</h1>
          <p className="text-xl text-slate-600">Enterprise CRM Solutions</p>
        </div>

        <Card className="p-10 mb-8 bg-white shadow-xl border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Bondary CRM is a leading provider of customer relationship management solutions designed for modern
            enterprises. We empower organizations to build stronger customer relationships, streamline operations, and
            drive sustainable growth through innovative technology.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Our platform combines advanced automation, powerful analytics, and intuitive design to help businesses
            manage customer interactions with unprecedented efficiency.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white shadow-xl border-slate-200 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl inline-block mb-4">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-700 leading-relaxed">
              To empower organizations with intelligent CRM solutions that transform how they connect with customers and
              achieve measurable business outcomes.
            </p>
          </Card>

          <Card className="p-8 bg-white shadow-xl border-slate-200 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl inline-block mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-700 leading-relaxed">
              To be the global standard for enterprise CRM, making sophisticated customer management technology
              accessible and secure for organizations worldwide.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
