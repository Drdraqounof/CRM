"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PersonalQuestionsPage() {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store answers in localStorage/session for now
    window.localStorage.setItem("personalAge", age);
    window.localStorage.setItem("personalInterests", interests);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Personal Use Questions</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Your Age</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
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
