"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Database,
  Mail,
  Sparkles,
  Send,
  Copy,
  Check,
  Heart,
  Calendar,
  UserMinus,
  Megaphone,
  Loader2,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

type TemplateType = "thank-you" | "appeal" | "follow-up" | "event";

interface Donor {
  id: string;
  name: string;
  email: string;
  totalDonated: number;
  status: string;
  lastDonation?: string;
}

interface Campaign {
  id: string;
  name: string;
  goal: number;
  raised: number;
  status: string;
}

export default function AIWriterPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("thank-you");
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [customContext, setCustomContext] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showDonorDropdown, setShowDonorDropdown] = useState(false);
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Fetch donors and campaigns
  useEffect(() => {
    fetch("/api/donors")
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch(console.error);
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch(console.error);
  }, []);

  const templates = [
    {
      type: "thank-you" as const,
      title: "Thank You Letter",
      description: "Express gratitude for a recent donation",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      type: "appeal" as const,
      title: "Campaign Appeal",
      description: "Request support for a fundraising campaign",
      icon: Megaphone,
      color: "from-blue-500 to-indigo-500",
    },
    {
      type: "follow-up" as const,
      title: "Follow-up Message",
      description: "Re-engage lapsed or inactive donors",
      icon: UserMinus,
      color: "from-orange-500 to-amber-500",
    },
    {
      type: "event" as const,
      title: "Event Invitation",
      description: "Invite donors to upcoming events",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const handleGenerate = async () => {
    if (!selectedDonor) {
      alert("Please select a donor first");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");
    setSendStatus("idle");

    try {
      const response = await fetch("/api/ai-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateType: selectedTemplate,
          donor: selectedDonor,
          campaign: selectedCampaign,
          customContext,
        }),
      });

      const data = await response.json();
      if (data.content) {
        setGeneratedContent(data.content);
      } else {
        setGeneratedContent("Error generating content. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setGeneratedContent("Error generating content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = async () => {
    if (!selectedDonor || !generatedContent) return;

    setIsSending(true);
    setSendStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedDonor.email,
          subject: getEmailSubject(),
          content: generatedContent,
          donorName: selectedDonor.name,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSendStatus("success");
      } else {
        setSendStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSendStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const getEmailSubject = () => {
    switch (selectedTemplate) {
      case "thank-you":
        return "Thank You for Your Generous Support!";
      case "appeal":
        return selectedCampaign
          ? `Support Our ${selectedCampaign.name} Campaign`
          : "Your Support Can Make a Difference";
      case "follow-up":
        return "We Miss You! Let's Reconnect";
      case "event":
        return "You're Invited to a Special Event";
      default:
        return "A Message from Bondary CRM";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bondary
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push("/donor-list")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Donors
              </button>
              <button
                onClick={() => router.push("/campaigns")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Campaigns
              </button>
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                AI Writer
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AI Writing Assistant
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Generate personalized donor communications with AI. Select a template,
            choose a donor, and let AI craft the perfect message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                1. Choose Template
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.type}
                      onClick={() => setSelectedTemplate(template.type)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedTemplate === template.type
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center mb-3`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {template.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {template.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Donor Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                2. Select Donor
              </h2>
              <div className="relative">
                <button
                  onClick={() => setShowDonorDropdown(!showDonorDropdown)}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between text-left"
                >
                  {selectedDonor ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedDonor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {selectedDonor.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {selectedDonor.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-500">
                      <User className="w-5 h-5" />
                      <span>Select a donor...</span>
                    </div>
                  )}
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </button>
                {showDonorDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-64 overflow-y-auto z-10">
                    {donors.map((donor) => (
                      <button
                        key={donor.id}
                        onClick={() => {
                          setSelectedDonor(donor);
                          setShowDonorDropdown(false);
                        }}
                        className="w-full p-3 hover:bg-slate-50 flex items-center gap-3 text-left border-b border-slate-100 last:border-0"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{donor.name}</p>
                          <p className="text-xs text-slate-500">{donor.email}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Selection (for appeals) */}
            {selectedTemplate === "appeal" && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  3. Select Campaign (Optional)
                </h2>
                <div className="relative">
                  <button
                    onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between text-left"
                  >
                    {selectedCampaign ? (
                      <div>
                        <p className="font-semibold text-slate-900">
                          {selectedCampaign.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          ${selectedCampaign.raised.toLocaleString()} of $
                          {selectedCampaign.goal.toLocaleString()} raised
                        </p>
                      </div>
                    ) : (
                      <span className="text-slate-500">Select a campaign...</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </button>
                  {showCampaignDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-64 overflow-y-auto z-10">
                      {campaigns.map((campaign) => (
                        <button
                          key={campaign.id}
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowCampaignDropdown(false);
                          }}
                          className="w-full p-3 hover:bg-slate-50 text-left border-b border-slate-100 last:border-0"
                        >
                          <p className="font-medium text-slate-900">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {campaign.status} • $
                            {campaign.raised.toLocaleString()} raised
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Custom Context */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {selectedTemplate === "appeal" ? "4" : "3"}. Add Context (Optional)
              </h2>
              <textarea
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="Add any specific details you want included in the message..."
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none h-24 text-slate-900"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedDonor || isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Message
                </>
              )}
            </button>
          </div>

          {/* Right Column - Generated Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Generated Message
              </h2>
              {generatedContent && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6 min-h-[300px] whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {generatedContent}
                </div>

                {/* Send Email Button */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Send to: {selectedDonor?.email}
                      </p>
                      <p className="text-xs text-slate-500">
                        Subject: {getEmailSubject()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSendEmail}
                    disabled={isSending || sendStatus === "success"}
                    className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      sendStatus === "success"
                        ? "bg-green-500 text-white"
                        : sendStatus === "error"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : sendStatus === "success" ? (
                      <>
                        <Check className="w-5 h-5" />
                        Email Sent!
                      </>
                    ) : sendStatus === "error" ? (
                      <>
                        <Mail className="w-5 h-5" />
                        Retry Send
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Email
                      </>
                    )}
                  </button>
                  {sendStatus === "error" && (
                    <p className="text-sm text-red-600 mt-2 text-center">
                      Failed to send. Please check your Resend API key.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-12 text-center">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">
                  Select a template and donor, then click "Generate Message" to
                  create personalized content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
