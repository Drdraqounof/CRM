"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Filter, Users, DollarSign, TrendingUp } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "@/lib/useTheme";

interface Donor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalDonated?: number;
  status?: string;
  createdAt: string;
  lastDonation?: string;
  description?: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  criteria: string[];
  donorCount: number;
  color: string;
  createdAt: string;
}

const groupsData: Group[] = [
  {
    id: 1,
    name: "Major Donors",
    description: "Donors with total contributions of $10,000 or more",
    criteria: ["Total Donated ≥ $10,000"],
    donorCount: 0,
    color: "bg-purple-500",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Active Monthly Givers",
    description: "Donors who have given in the last 30 days",
    criteria: ["Last Donation within 30 days", "Status: Active"],
    donorCount: 0,
    color: "bg-green-500",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Lapsed Donors",
    description: "Donors who haven't contributed in 6+ months",
    criteria: ["No donation for 6+ months"],
    donorCount: 0,
    color: "bg-red-500",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    name: "First-Time Donors",
    description: "Donors who have given this year",
    criteria: ["Last Donation in current year"],
    donorCount: 0,
    color: "bg-indigo-500",
    createdAt: "2024-01-15",
  },
  {
    id: 5,
    name: "Event Attendees",
    description: "Donors from events and galas",
    criteria: ["Attended event or gala"],
    donorCount: 0,
    color: "bg-blue-500",
    createdAt: "2024-01-15",
  },
];

export default function GroupDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { themeConfig } = useTheme();
  const [group, setGroup] = useState<Group | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [groupDonors, setGroupDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  const groupId = parseInt(params.id as string);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("/api/donors");
        if (res.ok) {
          const data = await res.json();
          setDonors(data);
        }
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  useEffect(() => {
    const foundGroup = groupsData.find((g) => g.id === groupId);
    setGroup(foundGroup || null);

    if (foundGroup && donors.length > 0) {
      const now = new Date();
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      const filtered = donors.filter((donor) => {
        switch (foundGroup.name) {
          case "Major Donors":
            return (donor.totalDonated || 0) >= 10000;
          case "Active Monthly Givers":
            const lastDonation = donor.lastDonation ? new Date(donor.lastDonation) : null;
            return lastDonation && lastDonation >= thirtyDaysAgo && donor.status === "active";
          case "Recent Donors":
            const recentDonation = donor.lastDonation ? new Date(donor.lastDonation) : null;
            return recentDonation && recentDonation >= sixMonthsAgo;
          case "YTD Donors":
            const ytdDonation = donor.lastDonation ? new Date(donor.lastDonation) : null;
            return ytdDonation && ytdDonation >= startOfYear;
          case "Lapsed Donors":
            return donor.status === "lapsed";
          default:
            return false;
        }
      });
      setGroupDonors(filtered);
    }
  }, [groupId, donors]);

  if (!group) {
    return (
      <div className={`min-h-screen ${themeConfig.bg}`}>
        <Sidebar />
        <div className="ml-64 p-8">
          <div className="text-center">
            <p className={themeConfig.text}>Group not found</p>
            <button
              onClick={() => router.push("/groups")}
              className={`mt-4 ${themeConfig.primary} text-white px-4 py-2 rounded hover:opacity-90`}
            >
              Back to Groups
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <Sidebar />

      <div className="ml-64 transition-all duration-300">
        <main className="p-8">
          {/* Back Button */}
          <button
            onClick={() => router.push("/groups")}
            className={`flex items-center gap-2 ${themeConfig.primaryText} hover:underline mb-6`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Groups
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg ${group.color} flex items-center justify-center`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${themeConfig.text}`}>{group.name}</h1>
                  <p className={`${themeConfig.textSecondary} mt-1`}>{group.description}</p>
                </div>
              </div>
              <button
                onClick={() => router.push(`/donor-list?group=${group.id}`)}
                className={`${themeConfig.primary} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap`}
              >
                View Donors List
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`${themeConfig.surface} rounded-xl border ${themeConfig.border} shadow-sm p-6`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${group.color} flex items-center justify-center`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>Donors in Group</p>
                  <p className={`text-2xl font-bold ${themeConfig.text}`}>{loading ? "-" : groupDonors.length}</p>
                </div>
              </div>
            </div>

            <div className={`${themeConfig.surface} rounded-xl border ${themeConfig.border} shadow-sm p-6`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>Total Given</p>
                  <p className={`text-2xl font-bold ${themeConfig.text}`}>
                    ${loading ? "-" : groupDonors.reduce((sum, d) => sum + (d.totalDonated || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className={`${themeConfig.surface} rounded-xl border ${themeConfig.border} shadow-sm p-6`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>Average Gift</p>
                  <p className={`text-2xl font-bold ${themeConfig.text}`}>
                    ${loading ? "-" : groupDonors.length > 0 ? Math.round(groupDonors.reduce((sum, d) => sum + (d.totalDonated || 0), 0) / groupDonors.length).toLocaleString() : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Criteria Section */}
          <div className={`${themeConfig.surface} rounded-xl border ${themeConfig.border} shadow-sm p-6 mb-8`}>
            <h2 className={`text-xl font-bold ${themeConfig.text} mb-4`}>Group Criteria</h2>
            <div className="space-y-2">
              {group.criteria.map((criterion, idx) => (
                <div key={idx} className={`flex items-center gap-3 ${themeConfig.text}`}>
                  <Filter className={`w-4 h-4 ${themeConfig.textSecondary}`} />
                  <span>{criterion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Members */}
          <div className={`${themeConfig.surface} rounded-xl border ${themeConfig.border} shadow-sm overflow-hidden`}>
            <div className="p-6 border-b border-inherit">
              <h2 className={`text-xl font-bold ${themeConfig.text}`}>Group Members ({groupDonors.length})</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${themeConfig.accent} border-b ${themeConfig.border}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase`}>
                      Name
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase`}>
                      Email
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase`}>
                      Phone
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase`}>
                      Total Donated
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase`}>
                      Last Donation
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase`}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${themeConfig.border}`}>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className={`px-6 py-8 text-center ${themeConfig.textSecondary}`}>
                        Loading donors...
                      </td>
                    </tr>
                  ) : groupDonors.length > 0 ? (
                    groupDonors.map((donor) => (
                      <tr key={donor.id} className={`hover:${themeConfig.accent}`}>
                        <td className={`px-6 py-4 font-medium ${themeConfig.text}`}>{donor.name}</td>
                        <td className={`px-6 py-4 ${themeConfig.textSecondary}`}>{donor.email}</td>
                        <td className={`px-6 py-4 ${themeConfig.textSecondary}`}>{donor.phone || "-"}</td>
                        <td className={`px-6 py-4 font-semibold ${themeConfig.text}`}>
                          ${(donor.totalDonated || 0).toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 ${themeConfig.textSecondary}`}>
                          {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              donor.status === "major"
                                ? "bg-purple-100 text-purple-800"
                                : donor.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {donor.status ? donor.status.charAt(0).toUpperCase() + donor.status.slice(1) : "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className={`px-6 py-8 text-center ${themeConfig.textSecondary}`}>
                        No donors found in this group
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className={`border-t ${themeConfig.border} ${themeConfig.surface} py-6`}>
          <div className="px-8 text-center text-sm">
            <p className={`mb-1 ${themeConfig.textSecondary}`}>Bondary CRM © 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
