"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Settings,
  Bell,
  Shield,
  Mail,
  Globe,
  Moon,
  Sun,
  Save,
  Palette,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { themes, ThemeColor, saveTheme, loadTheme } from "../../lib/theme";
import { useTheme } from "../../lib/useTheme";

function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>("light");

  useEffect(() => {
    setCurrentTheme(loadTheme());
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Settings state
  const [settings, setSettings] = useState({
    // General
    organizationName: "My Organization",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    // Notifications
    emailNotifications: true,
    donationAlerts: true,
    campaignUpdates: true,
    weeklyDigest: false,
    // Privacy
    profileVisibility: "team",
    showDonorAmounts: true,
    dataRetention: "forever",
  });

  const handleSave = () => {
    // In a real app, this would save to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleThemeChange = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    saveTheme(theme);
    // Reload the page to apply theme changes, while preserving the tab selection
    setTimeout(() => {
      window.location.href = `/settings?tab=${activeTab}`;
    }, 100);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "theme", label: "Theme", icon: Palette },
  ];

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        {/* Main Content */}
        <main className="p-8 max-w-5xl">
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${themeConfig.text}`}>Settings</h1>
            <p className={`${themeConfig.textSecondary} mt-1`}>Manage your application preferences</p>
          </div>

          <div className="flex gap-8">
            {/* Settings Tabs */}
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        router.push(`/settings?tab=${tab.id}`);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? `${themeConfig.accent} ${themeConfig.primaryText} font-medium`
                          : `${themeConfig.text} hover:${themeConfig.accent}`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className={`flex-1 ${themeConfig.surface} rounded-xl border ${themeConfig.border} shadow-sm p-6`}>
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${themeConfig.text}`}>General Settings</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                    type="text"
                    value={settings.organizationName}
                    onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${themeConfig.text}`}>Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
                    { key: "donationAlerts", label: "Donation Alerts", description: "Get notified when new donations are received" },
                    { key: "campaignUpdates", label: "Campaign Updates", description: "Receive updates on campaign progress" },
                    { key: "weeklyDigest", label: "Weekly Digest", description: "Get a weekly summary of activity" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <button
                        onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings[item.key as keyof typeof settings] ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            settings[item.key as keyof typeof settings] ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${themeConfig.text}`}>Privacy & Security</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Public - Anyone can view</option>
                    <option value="team">Team Only - Only team members can view</option>
                    <option value="private">Private - Only you can view</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Show Donor Amounts</p>
                    <p className="text-sm text-gray-500">Display donation amounts in reports</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, showDonorAmounts: !settings.showDonorAmounts })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.showDonorAmounts ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.showDonorAmounts ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Retention
                  </label>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="forever">Keep Forever</option>
                    <option value="7years">7 Years</option>
                    <option value="5years">5 Years</option>
                    <option value="3years">3 Years</option>
                  </select>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-3">Danger Zone</h3>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Theme Settings */}
            {activeTab === "theme" && (
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${themeConfig.text}`}>Theme & Appearance</h2>
                <p className={`text-sm ${themeConfig.textSecondary}`}>Choose a color theme to change the look and feel of the entire application.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.entries(themes) as [ThemeColor, any][]).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        currentTheme === key
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg ${theme.primary}`} />
                        <span className={`font-medium ${themeConfig.text}`}>{theme.name}</span>
                        {currentTheme === key && (
                          <span className="ml-auto text-blue-600 font-semibold">✓ Active</span>
                        )}
                      </div>
                      <div className="flex gap-2 mb-3">
                        <div className={`w-12 h-8 rounded ${theme.bg}`} />
                        <div className={`w-12 h-8 rounded ${theme.surface} border`} />
                        <div className={`w-12 h-8 rounded ${theme.accent}`} />
                      </div>
                      <p className={`text-xs ${themeConfig.textSecondary}`}>Background • Surface • Accent</p>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your theme choice will be applied across all pages including the dashboard, donor list, campaigns, and more.
                  </p>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className={`mt-8 pt-6 border-t ${themeConfig.border} flex justify-end gap-3`}>
              {saved && (
                <span className="text-green-600 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Settings saved!
                </span>
              )}
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
