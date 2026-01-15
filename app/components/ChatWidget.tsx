"use client"

import { useState } from "react"
import { Bot, Users, MessageSquare, ArrowRight, X } from "lucide-react"

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hi! I'm your Bondary AI assistant. How can I help you today?" }
  ])
  const [isLoading, setIsLoading] = useState(false)

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
    <>
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
    </>
  )
}
