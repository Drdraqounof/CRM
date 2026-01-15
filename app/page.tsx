"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Database, Users, Calendar, BarChart3, ChevronRight, Check, ArrowRight } from "lucide-react"
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
            {/* Footer */}
            <div className="mt-20 text-center">
              <Button
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-12 py-4 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-12 border-t border-slate-200/50">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bondary</span>
                </div>
                <p className="text-sm text-slate-500">© 2026 Bondary CRM. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
