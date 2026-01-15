"use client"

import type React from "react"

import { useState } from "react"
import { Database, Users, Calendar, BarChart3, ChevronRight, Check, ArrowRight, Sparkles, Bot, Code, Zap, MessageSquare, Cpu, X } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export default function BondaryCRM() {
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "login" | "dashboard" | "features">("home")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hi! I'm your Bondary AI assistant. How can I help you today?" }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  const handleLogin = () => {
    const newErrors: { username?: string; password?: string } = {}

    if (!username.trim()) {
      newErrors.username = "Username is required"
    }
    if (!password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setCurrentPage("dashboard")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  // Render based on current page
  if (currentPage === "login") return (
    <LoginPage
      setCurrentPage={setCurrentPage}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleKeyPress={handleKeyPress}
      errors={errors}
      setErrors={setErrors}
    />
  )
  if (currentPage === "about") return <AboutPage setCurrentPage={setCurrentPage} />
  if (currentPage === "features") return <FeaturesPage setCurrentPage={setCurrentPage} />
  if (currentPage === "dashboard") return (
    <DashboardPage
      setCurrentPage={setCurrentPage}
      username={username}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  )
  return (
    <HomePage
      setCurrentPage={setCurrentPage}
      isChatOpen={isChatOpen}
      setIsChatOpen={setIsChatOpen}
      chatMessage={chatMessage}
      setChatMessage={setChatMessage}
      chatHistory={chatHistory}
      setChatHistory={setChatHistory}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  )
}

// Home Page
const HomePage = ({
  setCurrentPage,
  isChatOpen,
  setIsChatOpen,
  chatMessage,
  setChatMessage,
  chatHistory,
  setChatHistory,
  isLoading,
  setIsLoading
}: {
  setCurrentPage: (page: "home" | "about" | "login" | "dashboard" | "features") => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessage: string;
  setChatMessage: (msg: string) => void;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  setChatHistory: (history: Array<{ role: 'user' | 'assistant'; content: string }>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) => {
  const sendMessage = async () => {
    if (!chatMessage.trim() || isLoading) return

    const userMessage = chatMessage.trim()
    setChatMessage('')
    
    // Add user message to history
    const newHistory = [...chatHistory, { role: 'user' as const, content: userMessage }]
    setChatHistory(newHistory)
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })
      
      const data = await response.json()
      
      if (data.error) {
        setChatHistory([...newHistory, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again or contact support@bondary.com for assistance." }])
      } else {
        setChatHistory([...newHistory, { role: 'assistant', content: data.response }])
      }
    } catch (error) {
      setChatHistory([...newHistory, { role: 'assistant', content: "I'm sorry, I couldn't connect to the server. Please check your connection and try again." }])
    } finally {
      setIsLoading(false)
    }
  }

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
                onClick={() => setCurrentPage("features")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                About Us
              </button>
              <button
                onClick={() => setCurrentPage("login")}
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
                onClick={() => setCurrentPage("login")}
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
            {/* Features Section */}
            <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="text-center mb-20">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">Features</span>
                <h3 className="text-5xl font-extrabold text-slate-900 mb-6 text-balance tracking-tight">Why Choose Bondary CRM?</h3>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
                  Everything you need to build stronger customer relationships and drive business growth
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Intuitive Interface",
                    description: "Modern, user-friendly design for rapid team onboarding and adoption",
                  },
                  {
                    title: "Real-Time Collaboration",
                    description: "Secure cloud access with seamless team synchronization",
                  },
                  {
                    title: "Custom Dashboards",
                    description: "Personalized reporting and analytics tailored to your needs",
                  },
                  {
                    title: "Smart Automation",
                    description: "Automated reminders, tasks, and intelligent follow-ups",
                  },
                  {
                    title: "Seamless Integrations",
                    description: "Connect with your favorite tools and platforms effortlessly",
                  },
                  {
                    title: "World-Class Support",
                    description: "Dedicated onboarding and 24/7 customer success team",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-slate-200/50 rounded-2xl group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shrink-0 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 text-lg">{feature.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-20 text-center">
                <Button
                  onClick={() => setCurrentPage("login")}
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
      </div>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Open chat"
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl shadow-blue-500/20 border border-slate-200/50 overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Bondary AI Assistant</h3>
                <p className="text-white/80 text-sm">Ask me about Bondary CRM</p>
              </div>
            </div>
          </div>
          <div className="h-80 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' ? (
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg h-fit shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-500 to-slate-600 p-2 rounded-lg h-fit shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`p-3 rounded-xl shadow-sm border border-slate-100 max-w-[80%] ${
                  msg.role === 'assistant' 
                    ? 'bg-white rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  <p className={`text-sm whitespace-pre-wrap ${msg.role === 'assistant' ? 'text-slate-700' : 'text-white'}`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg h-fit">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-slate-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about Bondary CRM..."
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    sendMessage()
                  }
                }}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isLoading || !chatMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const LoginPage = ({
  setCurrentPage,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleKeyPress,
  errors,
  setErrors
}: {
  setCurrentPage: (page: "home" | "about" | "login" | "dashboard" | "features") => void;
  username: string;
  setUsername: (u: string) => void;
  password: string;
  setPassword: (p: string) => void;
  handleLogin: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errors: { username?: string; password?: string };
  setErrors: (e: { username?: string; password?: string }) => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl shadow-blue-500/30">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bondary
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Sign in to your account</p>
        </div>

        <Card className="p-10 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-slate-200/50 rounded-3xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errors.username) setErrors({ ...errors, username: undefined })
                }}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.username ? "border-red-500" : "border-slate-200"
                }`}
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors({ ...errors, password: undefined })
                }}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.password ? "border-red-500" : "border-slate-200"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] rounded-xl"
            >
              Sign In
            </Button>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-sm text-slate-500 hover:text-blue-600 transition-all duration-300 font-medium w-full mt-4 py-2"
            >
              ← Back to home
            </button>
          </div>
        </Card>
      </div>
    </div>
  )

const AboutPage = ({
  setCurrentPage
}: {
  setCurrentPage: (page: "home" | "about" | "login" | "dashboard" | "features") => void;
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
              onClick={() => setCurrentPage("login")}
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

const DashboardPage = ({
  setCurrentPage,
  username,
  setUsername,
  setPassword
}: {
  setCurrentPage: (page: "home" | "about" | "login" | "dashboard" | "features") => void;
  username: string;
  setUsername: (u: string) => void;
  setPassword: (p: string) => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
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
          <Button
            onClick={() => {
              setCurrentPage("home")
              setUsername("")
              setPassword("")
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {username || "User"}!</h2>
          <p className="text-slate-600">Here's your CRM dashboard overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl shadow-blue-500/5 border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-slate-500 text-sm mb-1 font-medium">Total Contacts</p>
            <p className="text-4xl font-extrabold text-slate-900">1,234</p>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl shadow-indigo-500/5 border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <span className="text-sm text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-slate-500 text-sm mb-1 font-medium">Active Deals</p>
            <p className="text-4xl font-extrabold text-slate-900">87</p>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl shadow-purple-500/5 border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-sm text-orange-600 font-bold bg-orange-100 px-3 py-1 rounded-full">Due soon</span>
            </div>
            <p className="text-slate-500 text-sm mb-1 font-medium">Tasks Today</p>
            <p className="text-4xl font-extrabold text-slate-900">24</p>
          </Card>
        </div>

        <Card className="p-10 bg-white/95 backdrop-blur-sm shadow-xl shadow-slate-500/5 border-slate-200/50 rounded-2xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            Your CRM dashboard is ready! Connect your data sources to see real-time insights.
          </p>
        </Card>
      </div>
    </div>
  )

  // Features Page
const FeaturesPage = ({
  setCurrentPage
}: {
  setCurrentPage: (page: "home" | "about" | "login" | "dashboard" | "features") => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
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
              onClick={() => setCurrentPage("home")}
              className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
            >
              About Us
            </button>
            <button
              onClick={() => setCurrentPage("login")}
              className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Development
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 text-balance tracking-tight">
            Built with{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GitHub Copilot
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we leveraged AI-powered development tools to build and enhance Bondary CRM, 
            making development faster, smarter, and more efficient.
          </p>
        </div>

        {/* How We Used Copilot Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How We Used GitHub Copilot</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              GitHub Copilot transformed our development workflow, helping us write better code faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-purple-500/25">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Code Generation</h3>
              <p className="text-slate-600 leading-relaxed">
                Copilot helped generate React components, TypeScript interfaces, and complex UI logic with simple natural language prompts, reducing boilerplate code by 60%.
              </p>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-blue-500/25">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rapid Prototyping</h3>
              <p className="text-slate-600 leading-relaxed">
                Built entire page layouts and features in minutes instead of hours. Copilot suggested complete component structures based on our design patterns.
              </p>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-green-500/25">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bug Fixing</h3>
              <p className="text-slate-600 leading-relaxed">
                Identified and fixed JSX syntax errors, TypeScript type mismatches, and CSS styling issues instantly with Copilot's intelligent suggestions.
              </p>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-orange-500/25">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Natural Language Commands</h3>
              <p className="text-slate-600 leading-relaxed">
                Simply described what we wanted in plain English, and Copilot translated our intentions into working code—from "add a YouTube video" to "fix the CSS".
              </p>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-pink-500/25">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Chat Assistance</h3>
              <p className="text-slate-600 leading-relaxed">
                Used Copilot Chat to explain code, refactor components, and get suggestions for best practices in React, Next.js, and Tailwind CSS.
              </p>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-indigo-500/25">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Refactoring</h3>
              <p className="text-slate-600 leading-relaxed">
                Copilot helped restructure our codebase, improve component reusability, and optimize performance with intelligent code transformations.
              </p>
            </Card>
          </div>
        </div>

        {/* AI Integration Section */}
        <div className="mb-20">
          <Card className="p-12 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl shadow-purple-500/20">
            <div className="text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                AI Integration
              </div>
              <h2 className="text-4xl font-bold mb-6">How AI Powers Bondary CRM</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                Beyond development, we're integrating AI capabilities directly into the CRM to help users work smarter
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Bot className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">AI-Powered Insights</h3>
                  <p className="text-white/80 text-sm">
                    Intelligent analytics and predictions to help you understand customer behavior and trends
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <MessageSquare className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Smart Automation</h3>
                  <p className="text-white/80 text-sm">
                    Automated follow-ups, email suggestions, and task prioritization powered by machine learning
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Zap className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Predictive Actions</h3>
                  <p className="text-white/80 text-sm">
                    AI suggests the best next steps for each customer interaction based on historical data
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Ethical AI Usage Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Check className="w-4 h-4" />
              Ethical AI Practices
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Commitment to Ethical AI</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We believe in using AI responsibly, transparently, and ethically throughout our development process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Human-in-the-Loop</h3>
                  <p className="text-slate-600 leading-relaxed">
                    All AI-generated code is reviewed, tested, and validated by human developers. We never deploy code without thorough human oversight and approval.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg shadow-blue-500/25">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Transparency First</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We openly disclose our use of AI tools in development. This Features page itself demonstrates our commitment to being transparent about AI's role in building Bondary.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg shadow-purple-500/25">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Data Privacy</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No sensitive user data or proprietary business logic is shared with AI tools. We use AI for code assistance only, never for processing customer information.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg shadow-orange-500/25">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Original & Licensed Code</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We ensure all AI-assisted code respects intellectual property rights. We review suggestions for potential licensing issues and maintain originality in our codebase.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-xl shadow-lg shadow-pink-500/25">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Bias Awareness</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We actively review AI suggestions for potential biases and ensure our application serves all users fairly and equitably, regardless of background.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg shadow-teal-500/25">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Continuous Learning</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our team stays updated on AI ethics guidelines and best practices. We adapt our processes as new standards emerge in responsible AI development.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Development Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Development Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl">
              <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">60%</p>
              <p className="text-slate-600 font-medium">Faster Development</p>
            </Card>
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl">
              <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">500+</p>
              <p className="text-slate-600 font-medium">Lines of Code Generated</p>
            </Card>
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl">
              <p className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">90%</p>
              <p className="text-slate-600 font-medium">Bug Fix Accuracy</p>
            </Card>
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-slate-200/50 rounded-2xl">
              <p className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">10x</p>
              <p className="text-slate-600 font-medium">Productivity Boost</p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("login")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-12 py-4 shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
          >
            Try Bondary CRM
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
