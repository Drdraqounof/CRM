"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostLoginQuestionPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) return;
    // Store userType in localStorage/session for now
    window.localStorage.setItem("userType", userType);
    // Redirect to next questions page
    if (userType === "organization") {
      router.push("/post-login-question/organization");
    } else {
      router.push("/post-login-question/personal");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">How are you using Bondary?</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Select one:</label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="personal"
                  checked={userType === "personal"}
                  onChange={() => setUserType("personal")}
                  className="form-radio"
                />
                <span>Personal use</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="organization"
                  checked={userType === "organization"}
                  onChange={() => setUserType("organization")}
                  className="form-radio"
                />
                <span>With an organization</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={!userType}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
