"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Shield, Users, Building2 } from "lucide-react";

export default function PostLoginQuestionPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userType, setUserType] = useState<string>("");
  const [crmName, setCrmName] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If admin, require CRM name and team size
    if (session?.user?.isAdmin) {
      if (!crmName || !teamSize) return;
      
      window.localStorage.setItem("crmName", crmName);
      window.localStorage.setItem("teamSize", teamSize);
      
      try {
        await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userType: "admin",
            crmName,
            teamSize: parseInt(teamSize),
          }),
        });
      } catch (error) {
        console.error("Failed to save survey response:", error);
      }
      
      router.push("/dashboard");
    } else {
      if (!userType) return;
      
      window.localStorage.setItem("userType", userType);
      
      try {
        await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userType }),
        });
      } catch (error) {
        console.error("Failed to save survey response:", error);
      }
      
      if (userType === "organization") {
        router.push("/post-login-question/organization");
      } else {
        router.push("/post-login-question/personal");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {session?.user?.isAdmin ? (
          <>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Admin Setup</h1>
            </div>
            <p className="text-gray-600 text-center mb-6">Let's set up your CRM workspace</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What would you like to call this CRM?
                </label>
                <input
                  type="text"
                  value={crmName}
                  onChange={(e) => setCrmName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g. My Organization CRM, Donor Hub, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How many team members will need access?
                </label>
                <div className="space-y-3">
                  {["Just me", "2-5 people", "6-10 people", "10+ people"].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="teamSize"
                        value={option}
                        checked={teamSize === option}
                        onChange={() => setTeamSize(option)}
                        className="form-radio w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={!crmName || !teamSize}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Continue to Dashboard
              </button>
            </form>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> You can generate passkeys in Settings to invite team members without email invitations.
              </p>
            </div>
          </>
        ) : (
          <>
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
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                disabled={!userType}
              >
                Continue
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
