"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react"
import { Card } from "../../ui/card"
import { Button } from "../../ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant for Bondary CRM. I can help you with donor insights, campaign suggestions, data analysis, and more. What would you like to know?"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "Who are my top donors this month?",
    "How is my current campaign performing?",
    "Suggest ways to re-engage lapsed donors",
    "What's our donor retention rate?"
  ]

  const mockResponses: { [key: string]: string } = {
    "top donors": "Based on your data, your top 5 donors this month are:\n\n1. **The Johnson Foundation** - $15,000\n2. **Sarah Williams** - $8,500\n3. **Tech Corp Inc.** - $7,200\n4. **Community Trust** - $5,000\n5. **Green Valley LLC** - $4,800\n\nWould you like me to draft personalized thank-you messages for them?",
    "campaign": "Your **Annual Giving Campaign 2024** is performing well!\n\n📊 **Progress:** $78,500 of $100,000 (78.5%)\n👥 **Donors:** 245 contributors\n📈 **Trend:** Up 12% from last year\n\nAt this rate, you're projected to exceed your goal by March 15th. Consider sending a mid-campaign update to donors to maintain momentum.",
    "lapsed": "Here are some strategies to re-engage your 142 lapsed donors:\n\n1. **Personalized Outreach** - Send tailored emails highlighting impact since their last gift\n2. **Re-engagement Campaign** - Create a special \"We Miss You\" campaign with matching gifts\n3. **Survey** - Ask why they stopped giving to address concerns\n4. **Events** - Invite them to exclusive donor appreciation events\n\nWould you like me to draft a re-engagement email template?",
    "retention": "Your donor retention metrics:\n\n📊 **Overall Retention Rate:** 68% (industry avg: 45%)\n🔄 **First-time Donor Retention:** 42%\n⭐ **Repeat Donor Retention:** 81%\n\n**Insights:**\n- Your retention is above average - great job!\n- Focus on first-time donors with stronger stewardship\n- Consider a welcome series for new donors\n\nWant me to suggest specific retention strategies?"
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = { role: "user", content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Find matching response
    let response = "I can help you with donor management, campaign tracking, and data analysis. Could you please be more specific about what you'd like to know?"
    
    const lowerText = messageText.toLowerCase()
    if (lowerText.includes("top") && lowerText.includes("donor")) {
      response = mockResponses["top donors"]
    } else if (lowerText.includes("campaign")) {
      response = mockResponses["campaign"]
    } else if (lowerText.includes("lapsed") || lowerText.includes("re-engage")) {
      response = mockResponses["lapsed"]
    } else if (lowerText.includes("retention")) {
      response = mockResponses["retention"]
    }

    setMessages(prev => [...prev, { role: "assistant", content: response }])
    setIsTyping(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">AI-Powered Assistant</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Chat with AI</h1>
        <p className="text-slate-600">Get instant insights and suggestions for your CRM</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-white border-slate-200 text-center">
          <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-900">1,284</p>
          <p className="text-xs text-slate-500">Total Donors</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200 text-center">
          <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-900">$847K</p>
          <p className="text-xs text-slate-500">Total Raised</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200 text-center">
          <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-900">68%</p>
          <p className="text-xs text-slate-500">Retention Rate</p>
        </Card>
      </div>

      {/* Chat Container */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user" 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-slate-500 font-medium">Suggested questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSend(question)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your donors..."
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
