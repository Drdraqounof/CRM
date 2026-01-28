"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Tag,
  Target,
  Sparkles,
  Shield,
  User,
  Settings,
  LogOut,
  Database,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../lib/useTheme";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { themeConfig } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  // Hardcoded admin emails
  const adminEmails = [
    "rob@launchpadphilly.org",
    "sanaa@launchpadphilly.org",
    "taheera@launchpadphilly.org",
  ];
  
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/donor-list", icon: Users, label: "Donors" },
    { href: "/groups", icon: Tag, label: "Groups" },
    { href: "/campaigns", icon: Target, label: "Campaigns" },
    { href: "/ai-writer", icon: Sparkles, label: "AI Writer" },
  ];

  const bottomItems = [
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${themeConfig.sidebar} z-40 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className={`p-4 border-b ${themeConfig.border} flex items-center justify-between`}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg flex-shrink-0">
            <Database className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <h2 className={`font-semibold text-lg ${themeConfig.text}`}>Bondary</h2>
          )}
        </div>
        <button
          onClick={handleToggle}
          className={`p-1 hover:${themeConfig.accent} rounded-lg transition-colors`}
        >
          {isCollapsed ? (
            <ChevronRight className={`w-4 h-4 ${themeConfig.textSecondary}`} />
          ) : (
            <ChevronLeft className={`w-4 h-4 ${themeConfig.textSecondary}`} />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className={`flex-1 p-3 space-y-1 overflow-y-auto`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-blue-600 text-white"
                : `${themeConfig.text} hover:${themeConfig.accent}`
            } ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}

        {/* Admin Link - Only for admin emails */}
        {isAdmin && (
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive("/admin")
                ? "bg-blue-600 text-white"
                : `${themeConfig.text} hover:${themeConfig.accent}`
            } ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Admin" : undefined}
          >
            <Shield className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Admin</span>}
          </Link>
        )}

        {/* ...Questions link removed... */}
      </nav>

      {/* Divider */}
      <div className={`border-t ${themeConfig.border} mx-3`} />

      {/* Bottom Navigation */}
      <div className="p-3 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-blue-600 text-white"
                : `${themeConfig.text} hover:${themeConfig.accent}`
            } ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}

        {/* Sign Out */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>

      {/* User Info */}
      {session?.user && (
        <div className={`p-3 border-t ${themeConfig.border} ${themeConfig.accent} ${isCollapsed ? "px-2" : ""}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${themeConfig.text} truncate`}>
                  {session.user.name || "User"}
                </p>
                <p className={`text-xs ${themeConfig.textSecondary} truncate`}>
                  {session.user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
