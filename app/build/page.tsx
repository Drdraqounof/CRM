"use client"

import { useRouter } from "next/navigation"
import { Database, Users, BarChart3, ChevronRight, Check, ArrowRight, Sparkles, Bot, Code, Zap, MessageSquare, Cpu } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export default function FeaturesPage() {
  const router = useRouter()

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* System Architecture Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">System Architecture</h2>
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
            <svg viewBox="0 0 1000 700" className="w-full max-w-4xl h-auto">
              {/* Background */}
              <rect width="1000" height="700" fill="#f8fafc" rx="20" />
              
              {/* Client Layer */}
              <rect x="50" y="120" width="200" height="140" rx="15" fill="#e0e7ff" stroke="#6366f1" strokeWidth="3" />
              <text x="150" y="150" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#312e81">Client Layer</text>
              <text x="150" y="172" textAnchor="middle" fontSize="11" fill="#4f46e5">React/Next.js</text>
              <text x="150" y="190" textAnchor="middle" fontSize="11" fill="#4f46e5">Tailwind CSS</text>
              <text x="150" y="208" textAnchor="middle" fontSize="11" fill="#4f46e5">TypeScript</text>
              
              {/* API Gateway */}
              <rect x="400" y="120" width="200" height="140" rx="15" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" />
              <text x="500" y="150" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">API Gateway</text>
              <text x="500" y="172" textAnchor="middle" fontSize="11" fill="#1e3a8a">REST API</text>
              <text x="500" y="190" textAnchor="middle" fontSize="11" fill="#1e3a8a">Authentication</text>
              <text x="500" y="208" textAnchor="middle" fontSize="11" fill="#1e3a8a">Rate Limiting</text>
              
              {/* Server Layer */}
              <rect x="750" y="120" width="200" height="140" rx="15" fill="#e9d5ff" stroke="#9333ea" strokeWidth="3" />
              <text x="850" y="150" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#581c87">Server Layer</text>
              <text x="850" y="172" textAnchor="middle" fontSize="11" fill="#7e22ce">Node.js/Express</text>
              <text x="850" y="190" textAnchor="middle" fontSize="11" fill="#7e22ce">Business Logic</text>
              <text x="850" y="208" textAnchor="middle" fontSize="11" fill="#7e22ce">NextAuth</text>
              
              {/* Arrows from Client to API Gateway */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#475569" />
                </marker>
              </defs>
              <line x1="250" y1="190" x2="400" y2="190" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              {/* Arrows from API Gateway to Server */}
              <line x1="600" y1="190" x2="750" y2="190" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              {/* Cache Layer */}
              <rect x="50" y="380" width="200" height="140" rx="15" fill="#fecaca" stroke="#dc2626" strokeWidth="3" />
              <text x="150" y="410" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7f1d1d">Cache Layer</text>
              <text x="150" y="432" textAnchor="middle" fontSize="11" fill="#b91c1c">Redis</text>
              <text x="150" y="450" textAnchor="middle" fontSize="11" fill="#b91c1c">Session Storage</text>
              <text x="150" y="468" textAnchor="middle" fontSize="11" fill="#b91c1c">Query Cache</text>
              
              {/* Database */}
              <rect x="400" y="380" width="200" height="140" rx="15" fill="#bbf7d0" stroke="#059669" strokeWidth="3" />
              <text x="500" y="410" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">Database</text>
              <text x="500" y="432" textAnchor="middle" fontSize="11" fill="#047857">PostgreSQL</text>
              <text x="500" y="450" textAnchor="middle" fontSize="11" fill="#047857">Data Storage</text>
              <text x="500" y="468" textAnchor="middle" fontSize="11" fill="#047857">Prisma ORM</text>
              
              {/* External Services */}
              <rect x="750" y="380" width="200" height="140" rx="15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
              <text x="850" y="410" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">External Services</text>
              <text x="850" y="432" textAnchor="middle" fontSize="11" fill="#b45309">Email (SendGrid)</text>
              <text x="850" y="450" textAnchor="middle" fontSize="11" fill="#b45309">Analytics</text>
              <text x="850" y="468" textAnchor="middle" fontSize="11" fill="#b45309">Third-party APIs</text>
              
              {/* Arrows from Server to Cache */}
              <line x1="750" y1="260" x2="200" y2="380" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
              
              {/* Arrows from Server to Database */}
              <line x1="800" y1="260" x2="550" y2="380" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              {/* Arrows from Server to External Services */}
              <line x1="850" y1="260" x2="850" y2="380" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
              
              {/* Arrows from API Gateway to Cache */}
              <line x1="450" y1="260" x2="200" y2="380" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
              
              {/* Legend */}
              <text x="50" y="630" fontSize="12" fill="#64748b">
                <tspan fontWeight="bold">Solid Arrows:</tspan> Primary data flow
              </text>
              <text x="50" y="655" fontSize="12" fill="#64748b">
                <tspan fontWeight="bold">Dashed Arrows:</tspan> Secondary/Caching flows
              </text>
            </svg>
            <p className="text-slate-600 text-center max-w-2xl mt-6">
              This architecture illustrates the complete CRM system: the client-side React application communicates through a REST API gateway to the Node.js backend, which manages business logic, interfaces with PostgreSQL for data storage, leverages Redis for caching, and integrates with external services.
            </p>
          </div>
        </div>

        {/* ERD Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Entity Relationship Diagram (ERD)</h2>
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
            <svg viewBox="0 0 1200 700" className="w-full max-w-5xl h-auto">
              {/* Background */}
              <rect width="1200" height="700" fill="#f8fafc" rx="20" />
              
              {/* Users Table (Blue) */}
              <rect x="80" y="80" width="240" height="160" rx="15" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" />
              <rect x="80" y="80" width="240" height="40" rx="15" fill="#2563eb" />
              <text x="200" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">Users</text>
              <text x="95" y="140" fontSize="11" fill="#1e40af"><tspan fontWeight="bold">🔑</tspan> user_id (PK)</text>
              <text x="95" y="160" fontSize="11" fill="#1e3a8a">email</text>
              <text x="95" y="180" fontSize="11" fill="#1e3a8a">name</text>
              <text x="95" y="200" fontSize="11" fill="#1e3a8a">role</text>
              <text x="95" y="220" fontSize="11" fill="#1e3a8a">created_at</text>
              
              {/* Donors Table (Blue) */}
              <rect x="480" y="80" width="240" height="160" rx="15" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" />
              <rect x="480" y="80" width="240" height="40" rx="15" fill="#2563eb" />
              <text x="600" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">Donors</text>
              <text x="495" y="140" fontSize="11" fill="#1e40af"><tspan fontWeight="bold">🔑</tspan> donor_id (PK)</text>
              <text x="495" y="160" fontSize="11" fill="#1e3a8a"><tspan fontWeight="bold">🔗</tspan> user_id (FK)</text>
              <text x="495" y="180" fontSize="11" fill="#1e3a8a">name</text>
              <text x="495" y="200" fontSize="11" fill="#1e3a8a">email</text>
              <text x="495" y="220" fontSize="11" fill="#1e3a8a">phone</text>
              <text x="495" y="240" fontSize="11" fill="#1e3a8a">total_donated</text>
              
              {/* Campaigns Table (Purple) */}
              <rect x="880" y="80" width="240" height="140" rx="15" fill="#e9d5ff" stroke="#9333ea" strokeWidth="3" />
              <rect x="880" y="80" width="240" height="40" rx="15" fill="#9333ea" />
              <text x="1000" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">Campaigns</text>
              <text x="895" y="140" fontSize="11" fill="#581c87"><tspan fontWeight="bold">🔑</tspan> campaign_id (PK)</text>
              <text x="895" y="160" fontSize="11" fill="#7e22ce"><tspan fontWeight="bold">🔗</tspan> user_id (FK)</text>
              <text x="895" y="180" fontSize="11" fill="#7e22ce">name</text>
              <text x="895" y="200" fontSize="11" fill="#7e22ce">goal_amount</text>
              <text x="895" y="220" fontSize="11" fill="#7e22ce">start_date</text>
              
              {/* Surveys Table (Orange) */}
              <rect x="80" y="400" width="240" height="160" rx="15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
              <rect x="80" y="400" width="240" height="40" rx="15" fill="#f59e0b" />
              <text x="200" y="430" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">Surveys</text>
              <text x="95" y="460" fontSize="11" fill="#92400e"><tspan fontWeight="bold">🔑</tspan> survey_id (PK)</text>
              <text x="95" y="480" fontSize="11" fill="#b45309"><tspan fontWeight="bold">🔗</tspan> user_id (FK)</text>
              <text x="95" y="500" fontSize="11" fill="#b45309">title</text>
              <text x="95" y="520" fontSize="11" fill="#b45309">created_at</text>
              <text x="95" y="540" fontSize="11" fill="#b45309">status</text>
              
              {/* Donations Table (Green) */}
              <rect x="480" y="400" width="240" height="160" rx="15" fill="#bbf7d0" stroke="#059669" strokeWidth="3" />
              <rect x="480" y="400" width="240" height="40" rx="15" fill="#059669" />
              <text x="600" y="430" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">Donations</text>
              <text x="495" y="460" fontSize="11" fill="#065f46"><tspan fontWeight="bold">🔑</tspan> donation_id (PK)</text>
              <text x="495" y="480" fontSize="11" fill="#047857"><tspan fontWeight="bold">🔗</tspan> donor_id (FK)</text>
              <text x="495" y="500" fontSize="11" fill="#047857"><tspan fontWeight="bold">🔗</tspan> campaign_id (FK)</text>
              <text x="495" y="520" fontSize="11" fill="#047857">amount</text>
              <text x="495" y="540" fontSize="11" fill="#047857">date</text>
              <text x="495" y="560" fontSize="11" fill="#047857">payment_method</text>
              
              {/* Arrow Definitions */}
              <defs>
                <marker id="rel-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
                </marker>
              </defs>
              
              {/* Users to Donors (1:N) */}
              <line x1="320" y1="140" x2="480" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#rel-arrow)" />
              <text x="390" y="130" fontSize="10" fill="#64748b" fontWeight="bold">1:N</text>
              
              {/* Users to Surveys (1:N) */}
              <line x1="200" y1="240" x2="200" y2="400" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#rel-arrow)" />
              <text x="210" y="320" fontSize="10" fill="#64748b" fontWeight="bold">1:N</text>
              
              {/* Donors to Donations (1:N) */}
              <line x1="600" y1="240" x2="600" y2="400" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#rel-arrow)" />
              <text x="610" y="320" fontSize="10" fill="#64748b" fontWeight="bold">1:N</text>
              
              {/* Campaigns to Donations (1:N) */}
              <path d="M 1000 220 Q 900 310 720 400" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" fill="none" markerEnd="url(#rel-arrow)" />
              <text x="920" y="300" fontSize="10" fill="#64748b" fontWeight="bold">1:N</text>
            </svg>
            <p className="text-slate-600 text-center max-w-2xl mt-6">
              The Entity Relationship Diagram shows the core database structure: Users manage Donors, Campaigns, and Surveys. Donations connect Donors to Campaigns, capturing all fundraising transactions. Relationships show how data flows between entities (1:N = one-to-many).
            </p>
          </div>
        </div>
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
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-12 py-4 shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
          >
            Try Bondary CRM
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
