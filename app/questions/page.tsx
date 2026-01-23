"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  GripVertical,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

interface SurveyQuestion {
  id: string;
  question: string;
  type: string;
  options: string | null;
  required: boolean;
  order: number;
  category: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const questionTypes = [
  { value: "text", label: "Text Input" },
  { value: "textarea", label: "Long Text" },
  { value: "select", label: "Dropdown Select" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "scale", label: "Rating Scale (1-5)" },
];

const categories = [
  { value: "onboarding", label: "Onboarding" },
  { value: "feedback", label: "Feedback" },
  { value: "demographics", label: "Demographics" },
  { value: "preferences", label: "Preferences" },
  { value: "general", label: "General" },
];

// Hardcoded admin emails
const adminEmails = [
  "rob@launchpadphilly.org",
  "sanaa@launchpadphilly.org",
  "taheera@launchpadphilly.org",
];

export default function QuestionsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<SurveyQuestion | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email);

  // Redirect non-admin users
  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      router.push("/dashboard");
    }
  }, [session, status, router, isAdmin]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/questions");
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      showToast("Failed to load questions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setQuestions(questions.filter((q) => q.id !== id));
        showToast("Question deleted successfully");
      } else {
        showToast("Failed to delete question", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete question", "error");
    }
  };

  const toggleActive = async (question: SurveyQuestion) => {
    try {
      const res = await fetch(`/api/questions/${question.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !question.isActive }),
      });

      if (res.ok) {
        setQuestions(
          questions.map((q) =>
            q.id === question.id ? { ...q, isActive: !q.isActive } : q
          )
        );
        showToast(`Question ${question.isActive ? "deactivated" : "activated"}`);
      }
    } catch (error) {
      console.error("Toggle error:", error);
      showToast("Failed to update question", "error");
    }
  };

  const QuestionModal = () => {
    const [formData, setFormData] = useState({
      question: editingQuestion?.question || "",
      type: editingQuestion?.type || "text",
      options: editingQuestion?.options ? JSON.parse(editingQuestion.options) : [""],
      required: editingQuestion?.required || false,
      category: editingQuestion?.category || "general",
      isActive: editingQuestion?.isActive ?? true,
    });
    const [saving, setSaving] = useState(false);

    const needsOptions = ["select", "radio", "checkbox"].includes(formData.type);

    const addOption = () => {
      setFormData({ ...formData, options: [...formData.options, ""] });
    };

    const updateOption = (index: number, value: string) => {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    };

    const removeOption = (index: number) => {
      setFormData({
        ...formData,
        options: formData.options.filter((_: string, i: number) => i !== index),
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);

      try {
        const payload = {
          question: formData.question,
          type: formData.type,
          options: needsOptions ? formData.options.filter((o: string) => o.trim() !== "") : null,
          required: formData.required,
          category: formData.category,
          isActive: formData.isActive,
        };

        const url = editingQuestion
          ? `/api/questions/${editingQuestion.id}`
          : "/api/questions";
        const method = editingQuestion ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const savedQuestion = await res.json();
          if (editingQuestion) {
            setQuestions(questions.map((q) => (q.id === savedQuestion.id ? savedQuestion : q)));
            showToast("Question updated successfully");
          } else {
            setQuestions([...questions, savedQuestion]);
            showToast("Question created successfully");
          }
          setShowModal(false);
          setEditingQuestion(null);
        } else {
          const error = await res.json();
          showToast(error.error || "Failed to save question", "error");
        }
      } catch (error) {
        console.error("Save error:", error);
        showToast("Failed to save question", "error");
      } finally {
        setSaving(false);
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={() => {
          setShowModal(false);
          setEditingQuestion(null);
        }}
      >
        <div
          className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {editingQuestion ? "Edit Question" : "New Question"}
            </h2>
            <button
              onClick={() => {
                setShowModal(false);
                setEditingQuestion(null);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question Text *</label>
              <textarea
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Question Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {questionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {needsOptions && (
              <div>
                <label className="block text-sm font-medium mb-2">Options</label>
                <div className="space-y-2">
                  {formData.options.map((option: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${index + 1}`}
                      />
                      {formData.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add option
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.required}
                  onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Required</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingQuestion ? "Save Changes" : "Create Question"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingQuestion(null);
                }}
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

  const getTypeLabel = (type: string) => {
    return questionTypes.find((t) => t.value === type)?.label || type;
  };

  const getCategoryLabel = (category: string | null) => {
    return categories.find((c) => c.value === category)?.label || category || "General";
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
            </div>
          ))}
        </div>

        <main className="p-8">
          {showModal && <QuestionModal />}

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                Survey Questions
              </h1>
              <p className="text-gray-600 mt-1">
                Manage questions for user surveys and onboarding
              </p>
            </div>
            <button
              onClick={() => {
                setEditingQuestion(null);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              <p className="text-sm text-gray-500">Total Questions</p>
            </div>
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <p className="text-2xl font-bold text-green-600">
                {questions.filter((q) => q.isActive).length}
              </p>
              <p className="text-sm text-gray-500">Active Questions</p>
            </div>
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <p className="text-2xl font-bold text-orange-600">
                {questions.filter((q) => q.required).length}
              </p>
              <p className="text-sm text-gray-500">Required Questions</p>
            </div>
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <p className="text-2xl font-bold text-purple-600">
                {new Set(questions.map((q) => q.category)).size}
              </p>
              <p className="text-sm text-gray-500">Categories</p>
            </div>
          </div>

          {/* Questions List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : questions.length === 0 ? (
            <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No questions yet. Add your first survey question.</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Question
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-12">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Question
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Required
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {questions.map((question, index) => (
                    <tr key={question.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">
                        <GripVertical className="w-4 h-4" />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{question.question}</p>
                        {question.options && (
                          <p className="text-sm text-gray-500 mt-1">
                            Options: {JSON.parse(question.options).join(", ")}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                          {getTypeLabel(question.type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {getCategoryLabel(question.category)}
                      </td>
                      <td className="px-4 py-3">
                        {question.required ? (
                          <span className="text-orange-600 font-medium">Yes</span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(question)}
                          className={`flex items-center gap-1 text-sm font-medium ${
                            question.isActive ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {question.isActive ? (
                            <>
                              <ToggleRight className="w-5 h-5" />
                              Active
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-5 h-5" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingQuestion(question);
                              setShowModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(question.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
