"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrganizationQuestionsPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [orgRole, setOrgRole] = useState("");
  const [usedCRM, setUsedCRM] = useState("");
  const [crmComfort, setCrmComfort] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store answers in localStorage
    window.localStorage.setItem("organizationName", orgName);
    window.localStorage.setItem("organizationRole", orgRole);
    window.localStorage.setItem("usedCRM", usedCRM);
    window.localStorage.setItem("crmComfort", crmComfort);
    
    // Save to database
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "organization",
          orgName,
          orgRole,
          usedCRM,
          crmComfort,
        }),
      });
    } catch (error) {
      console.error("Failed to save survey response:", error);
    }
    
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Organization Questions</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Organization Name</label>
            <input
              type="text"
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter organization name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Your Role</label>
            <input
              type="text"
              value={orgRole}
              onChange={e => setOrgRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g. admin, staff, volunteer"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Have you used a CRM before?</label>
            <select
              value={usedCRM}
              onChange={e => setUsedCRM(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">How comfortable are you with using new software tools?</label>
            <select
              value={crmComfort}
              onChange={e => setCrmComfort(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="very-comfortable">Very comfortable</option>
              <option value="comfortable">Comfortable</option>
              <option value="somewhat-comfortable">Somewhat comfortable</option>
              <option value="not-comfortable">Not comfortable</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
