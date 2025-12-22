"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PersonalQuestionsPage() {
  const router = useRouter();
  const [usedCRM, setUsedCRM] = useState("");
  const [crmPurpose, setCrmPurpose] = useState("");
  const [interests, setInterests] = useState("");
  const [crmComfort, setCrmComfort] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store answers in localStorage/session for now
    window.localStorage.setItem("usedCRM", usedCRM);
    window.localStorage.setItem("crmPurpose", crmPurpose);
    window.localStorage.setItem("personalInterests", interests);
    window.localStorage.setItem("crmComfort", crmComfort);
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
            <input
              type="text"
              value={crmPurpose}
              onChange={e => setCrmPurpose(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g. managing contacts, tracking donations"
              required
            />
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
