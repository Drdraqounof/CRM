"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, Shield, RefreshCw, Search, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "@/lib/useTheme";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SurveyResponse {
  id: string;
  userId: string;
  userType: string | null;
  usedCRM: string | null;
  crmPurpose: string | null;
  interests: string | null;
  crmComfort: string | null;
  orgName: string | null;
  orgRole: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899", "#06B6D4", "#84CC16"];

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");

  // Hardcoded admin emails
  const adminEmails = [
    "rob@launchpadphilly.org",
    "sanaa@launchpadphilly.org",
    "taheera@launchpadphilly.org",
  ];
  
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email);

  // Redirect non-admin users
  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      router.push("/dashboard");
    }
  }, [session, status, router, isAdmin]);

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/survey");
      if (res.status === 403) {
        setError("Admin access required. You do not have permission to view this page.");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch responses");
      const data = await res.json();
      setResponses(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load survey responses";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // Calculate chart data
  const userTypeData = [
    { name: "Personal", value: responses.filter((r) => r.userType === "personal").length, color: "#10B981" },
    { name: "Organization", value: responses.filter((r) => r.userType === "organization").length, color: "#8B5CF6" },
  ].filter((d) => d.value > 0);

  const usedCRMData = [
    { name: "Yes", value: responses.filter((r) => r.usedCRM === "yes").length, color: "#3B82F6" },
    { name: "No", value: responses.filter((r) => r.usedCRM === "no").length, color: "#F59E0B" },
  ].filter((d) => d.value > 0);

  const comfortLevelData = [
    { name: "Very Comfortable", value: responses.filter((r) => r.crmComfort === "very-comfortable").length },
    { name: "Comfortable", value: responses.filter((r) => r.crmComfort === "comfortable").length },
    { name: "Somewhat", value: responses.filter((r) => r.crmComfort === "somewhat-comfortable").length },
    { name: "Not Comfortable", value: responses.filter((r) => r.crmComfort === "not-comfortable").length },
  ].filter((d) => d.value > 0);

  const crmPurposeData = [
    { name: "Donor Management", value: responses.filter((r) => r.crmPurpose === "donor-management").length },
    { name: "Fundraising", value: responses.filter((r) => r.crmPurpose === "fundraising").length },
    { name: "Communication", value: responses.filter((r) => r.crmPurpose === "communication").length },
    { name: "Tracking Donations", value: responses.filter((r) => r.crmPurpose === "tracking-donations").length },
    { name: "Organizing Contacts", value: responses.filter((r) => r.crmPurpose === "organizing-contacts").length },
  ].filter((d) => d.value > 0);

  const filteredResponses = responses.filter((r) => {
    const search = searchTerm.toLowerCase();
    return (
      r.user.email.toLowerCase().includes(search) ||
      r.user.name?.toLowerCase().includes(search) ||
      r.userType?.toLowerCase().includes(search) ||
      r.orgName?.toLowerCase().includes(search)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatValue = (value: string | null) => {
    if (!value) return <span className="text-gray-400 italic">Not answered</span>;
    return value.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const { themeConfig } = useTheme();

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        {/* Main Content */}
        <main className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className={`text-3xl font-bold flex items-center gap-2 ${themeConfig.text}`}>
                  <Shield className="w-8 h-8 text-blue-600" />
                  Admin Dashboard
                </h1>
                <p className={`${themeConfig.textSecondary} mt-1`}>View user survey responses and analytics</p>
              </div>
              <button
                onClick={fetchResponses}
                className={`flex items-center gap-2 px-4 py-2 ${themeConfig.primary} ${themeConfig.primaryText} rounded-lg hover:opacity-90 transition`}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`${themeConfig.surface} p-6 rounded-lg border border-${themeConfig.border} shadow-sm`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-2xl font-bold">{responses.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Personal Users</p>
                  <p className="text-2xl font-bold">
                    {responses.filter((r) => r.userType === "personal").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Organization Users</p>
                  <p className="text-2xl font-bold">
                    {responses.filter((r) => r.userType === "organization").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Used CRM Before</p>
                  <p className="text-2xl font-bold">
                    {responses.filter((r) => r.usedCRM === "yes").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab("charts")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "charts"
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Charts
              </button>
              <button
                onClick={() => setActiveTab("table")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "table"
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }`}
              >
                <PieChartIcon className="w-4 h-4" />
                Table View
              </button>
            </div>
          </div>

          {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : activeTab === "charts" ? (
          /* Charts View */
          <div className="space-y-6">
            {responses.length === 0 ? (
              <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No survey responses yet. Charts will appear once users submit surveys.</p>
              </div>
            ) : (
              <>
                {/* Row 1: User Type & Used CRM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Type Pie Chart */}
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">User Type Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={userTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {userTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Used CRM Before Pie Chart */}
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Previous CRM Experience</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={usedCRMData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {usedCRMData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Row 2: Comfort Level Bar Chart */}
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">CRM Comfort Level</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comfortLevelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                        {comfortLevelData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Row 3: CRM Purpose Bar Chart */}
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Primary CRM Purpose</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={crmPurposeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" allowDecimals={false} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]}>
                        {crmPurposeData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Table View */
          <>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by email, name, or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Used CRM</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">CRM Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Comfort Level</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Interests</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Organization</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredResponses.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        No survey responses found
                      </td>
                    </tr>
                  ) : (
                    filteredResponses.map((response) => (
                      <tr key={response.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{response.user.name || "N/A"}</p>
                            <p className="text-sm text-gray-500">{response.user.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              response.userType === "personal"
                                ? "bg-green-100 text-green-700"
                                : response.userType === "organization"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {response.userType || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{formatValue(response.usedCRM)}</td>
                        <td className="px-4 py-3 text-sm">{formatValue(response.crmPurpose)}</td>
                        <td className="px-4 py-3 text-sm">{formatValue(response.crmComfort)}</td>
                        <td className="px-4 py-3 text-sm max-w-[150px] truncate" title={response.interests || ""}>
                          {formatValue(response.interests)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {response.orgName ? (
                            <div>
                              <p className="font-medium">{response.orgName}</p>
                              <p className="text-gray-500 text-xs">{response.orgRole}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">N/A</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{formatDate(response.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}
        </main>
      </div>
    </div>
  );
}
