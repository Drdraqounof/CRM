"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Filter,
  Tag,
  DollarSign,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

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
  filterFn?: (donor: Donor) => boolean;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function GroupsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch donors from API
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

  // Calculate group counts based on actual donor data
  const calculateGroupCounts = (groupList: Group[]): Group[] => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    return groupList.map((group) => {
      let count = 0;
      
      switch (group.name) {
        case "Major Donors":
          count = donors.filter((d) => (d.totalDonated || 0) >= 10000).length;
          break;
        case "Active Monthly Givers":
          count = donors.filter((d) => {
            const lastDonation = d.lastDonation ? new Date(d.lastDonation) : null;
            return lastDonation && lastDonation >= thirtyDaysAgo && d.status === "active";
          }).length;
          break;
        case "Lapsed Donors":
          count = donors.filter((d) => {
            const lastDonation = d.lastDonation ? new Date(d.lastDonation) : null;
            return lastDonation && lastDonation < sixMonthsAgo && d.status === "lapsed";
          }).length;
          break;
        case "First-Time Donors":
          count = donors.filter((d) => {
            const createdAt = d.createdAt ? new Date(d.createdAt) : null;
            return createdAt && createdAt >= startOfYear;
          }).length;
          break;
        case "Event Attendees":
          // Since we don't have event attendance data, show 0 or count based on description
          count = donors.filter((d) => 
            d.description?.toLowerCase().includes("event") || 
            d.description?.toLowerCase().includes("gala") ||
            d.description?.toLowerCase().includes("attendee")
          ).length;
          break;
        default:
          count = 0;
      }
      
      return { ...group, donorCount: count };
    });
  };

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Major Donors",
      description: "Donors who have contributed $10,000 or more",
      criteria: ["Total donations >= $10,000"],
      donorCount: 0,
      color: "bg-purple-500",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Active Monthly Givers",
      description: "Donors with active status who donated in last 30 days",
      criteria: ["Active status", "Donated in last 30 days"],
      donorCount: 0,
      color: "bg-green-500",
      createdAt: "2024-02-20",
    },
    {
      id: 3,
      name: "Lapsed Donors",
      description: "Donors who haven't donated in 6+ months",
      criteria: ["Last donation > 6 months ago", "Lapsed status"],
      donorCount: 0,
      color: "bg-orange-500",
      createdAt: "2024-03-10",
    },
    {
      id: 4,
      name: "First-Time Donors",
      description: "Donors added this year",
      criteria: ["Created in current year"],
      donorCount: 0,
      color: "bg-blue-500",
      createdAt: "2024-01-01",
    },
    {
      id: 5,
      name: "Event Attendees",
      description: "Donors who have attended fundraising events",
      criteria: ["Event/Gala mentioned in notes"],
      donorCount: 0,
      color: "bg-pink-500",
      createdAt: "2024-04-05",
    },
  ]);

  // Update group counts when donors data changes
  useEffect(() => {
    if (donors.length > 0) {
      setGroups((prev) => calculateGroupCounts(prev));
    }
  }, [donors]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this group?")) {
      setGroups(groups.filter((g) => g.id !== id));
      showToast("Group deleted successfully");
    }
  };

  const handleSave = (group: Group) => {
    if (editingGroup) {
      setGroups(groups.map((g) => (g.id === group.id ? group : g)));
      showToast("Group updated successfully");
    } else {
      setGroups([...groups, { ...group, id: Date.now() }]);
      showToast("Group created successfully");
    }
    setShowModal(false);
    setEditingGroup(null);
  };

  const colorOptions = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  const GroupModal = () => {
    const [formData, setFormData] = useState<Group>(
      editingGroup || {
        id: 0,
        name: "",
        description: "",
        criteria: [""],
        donorCount: 0,
        color: "bg-blue-500",
        createdAt: new Date().toISOString().split("T")[0],
      }
    );

    const addCriteria = () => {
      setFormData({ ...formData, criteria: [...formData.criteria, ""] });
    };

    const updateCriteria = (index: number, value: string) => {
      const newCriteria = [...formData.criteria];
      newCriteria[index] = value;
      setFormData({ ...formData, criteria: newCriteria });
    };

    const removeCriteria = (index: number) => {
      setFormData({
        ...formData,
        criteria: formData.criteria.filter((_, i) => i !== index),
      });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
        <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {editingGroup ? "Edit Group" : "New Group"}
            </h2>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(formData);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., High-Value Donors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Describe this group"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full ${color} ${
                      formData.color === color ? "ring-2 ring-offset-2 ring-blue-500" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Criteria</label>
              <div className="space-y-2">
                {formData.criteria.map((criterion, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={criterion}
                      onChange={(e) => updateCriteria(index, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Total donations >= $5,000"
                    />
                    {formData.criteria.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCriteria(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCriteria}
                  className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add criteria
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingGroup ? "Save Changes" : "Create Group"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
                toast.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-70">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <main className="p-8">
          {showModal && <GroupModal />}

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donor Groups</h1>
              <p className="text-gray-600 mt-1">Organize donors into groups for targeted communication</p>
            </div>
            <button
              onClick={() => {
                setEditingGroup(null);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Group
            </button>
          </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Tag className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
                <p className="text-sm text-gray-500">Total Groups</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : donors.length}
                </p>
                <p className="text-sm text-gray-500">Total Donors</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : donors.filter(d => d.status === "active").length}
                </p>
                <p className="text-sm text-gray-500">Active Donors</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UserX className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : donors.filter(d => d.status === "lapsed").length}
                </p>
                <p className="text-sm text-gray-500">Lapsed Donors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-2 ${group.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${group.color} flex items-center justify-center`}>
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.donorCount} donors</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(group)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{group.description}</p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-500 uppercase">Criteria</p>
                  {group.criteria.map((criterion, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <Filter className="w-3 h-3 text-gray-400" />
                      {criterion}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-xs text-gray-400">Created {group.createdAt}</span>
                  <Link
                    href={`/donor-list?group=${group.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View Donors →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </main>
      </div>
    </div>
  );
}
