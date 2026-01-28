"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Save,
  X,
  Building,
  Shield,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "@/lib/useTheme";

interface Donor {
  id: string;
  totalDonated?: number;
}

interface Campaign {
  id: number;
  raised: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    phone: "",
    location: "",
    organization: "",
    role: "",
    bio: "",
    joinDate: "January 2024",
  });

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donorsRes, campaignsRes] = await Promise.all([
          fetch("/api/donors"),
          fetch("/api/campaigns"),
        ]);
        
        if (donorsRes.ok) {
          const donorsData = await donorsRes.json();
          setDonors(donorsData);
        }
        
        if (campaignsRes.ok) {
          const campaignsData = await campaignsRes.json();
          setCampaigns(campaignsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Update profile when session loads
  useEffect(() => {
    if (session?.user) {
      setProfile((prev) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }));
    }
  }, [session]);

  const handleSave = () => {
    // In a real app, this would save to API
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Calculate real stats
  const totalDonors = donors.length;
  const totalCampaigns = campaigns.length;
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raised || 0), 0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    { label: "Donors Managed", value: loading ? "..." : totalDonors.toString() },
    { label: "Campaigns Created", value: loading ? "..." : totalCampaigns.toString() },
    { label: "Emails Sent", value: "0" },
    { label: "Total Raised", value: loading ? "..." : formatCurrency(totalRaised) },
  ];

  const { themeConfig } = useTheme();

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        {/* Main Content */}
        <main className="p-8 max-w-5xl">
          {/* Profile Header */}
          <div className={`${themeConfig.surface} rounded-xl border border-${themeConfig.border} shadow-sm overflow-hidden mb-6`}>
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
            
            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex items-end gap-6 -mt-12">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full ${themeConfig.surface} border-4 border-${themeConfig.surface} shadow-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 ${themeConfig.primaryText} text-3xl font-bold`}>
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <button className={`absolute bottom-0 right-0 p-1.5 ${themeConfig.surface} rounded-full shadow-md border border-${themeConfig.border} hover:${themeConfig.accent}`}>
                    <Camera className={`w-4 h-4 ${themeConfig.textSecondary}`} />
                  </button>
                </div>
                <div className="flex-1 pb-2">
                  <h1 className={`text-2xl font-bold ${themeConfig.text}`}>{profile.name}</h1>
                  <p className={themeConfig.textSecondary}>{profile.role || "Team Member"} {profile.organization && `at ${profile.organization}`}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isEditing
                    ? `${themeConfig.accent} ${themeConfig.text}`
                    : `${themeConfig.primary} ${themeConfig.primaryText} hover:opacity-90`
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="col-span-2 bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            {saved && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Profile updated successfully!
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="flex items-center gap-2 text-gray-900">
                      <User className="w-4 h-4 text-gray-400" />
                      {profile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="flex items-center gap-2 text-gray-900">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="flex items-center gap-2 text-gray-900">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {profile.phone || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Enter location"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="flex items-center gap-2 text-gray-900">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {profile.location || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      placeholder="Enter organization"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="flex items-center gap-2 text-gray-900">
                      <Building className="w-4 h-4 text-gray-400" />
                      {profile.organization || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      placeholder="Enter role"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="flex items-center gap-2 text-gray-900">
                      <Users className="w-4 h-4 text-gray-400" />
                      {profile.role || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio || "No bio provided"}</p>
                )}
              </div>

              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Joined {profile.joinDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {session?.user?.isAdmin ? "Administrator" : "Team Member"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Created campaign", detail: "Spring Fundraiser", time: "2 hours ago" },
                  { action: "Added donor", detail: "John Smith", time: "5 hours ago" },
                  { action: "Sent email", detail: "Thank you letter", time: "1 day ago" },
                ].map((activity, index) => (
                  <div key={index} className="text-sm border-b pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-gray-500">{activity.detail}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}
