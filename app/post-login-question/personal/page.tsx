"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PersonalQuestionsPage() {
  const router = useRouter();
  const [usedCRM, setUsedCRM] = useState("");
  const [crmPurpose, setCrmPurpose] = useState("");
  const [interests, setInterests] = useState("");
  const [crmComfort, setCrmComfort] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store answers in localStorage
    window.localStorage.setItem("usedCRM", usedCRM);
    window.localStorage.setItem("crmPurpose", crmPurpose);
    window.localStorage.setItem("personalInterests", interests);
    window.localStorage.setItem("crmComfort", crmComfort);
    
    // Save to database
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "personal",
          usedCRM,
          crmPurpose,
          interests,
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
        <h1 className="text-2xl font-bold mb-4 text-center">Personal Use Questions</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-lg font-medium mb-2">What do you think a CRM is used for?</label>
            <select
              value={crmPurpose}
              onChange={e => setCrmPurpose(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="managing-contacts">Managing contacts</option>
              <option value="tracking-donations">Tracking donations</option>
              <option value="donor-communication">Donor communication</option>
              <option value="fundraising-campaigns">Fundraising campaigns</option>
              <option value="all-of-the-above">All of the above</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Your Interests</label>
            <input
              type="text"
              value={interests}
              onChange={e => setInterests(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g. fundraising, volunteering"
              required
            />
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
              <option value="very">Very comfortable</option>
              <option value="somewhat">Somewhat comfortable</option>
              <option value="not">Not comfortable</option>
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
