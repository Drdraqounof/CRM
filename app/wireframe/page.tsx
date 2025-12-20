"use client";


export default function WireframePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">Wireframe Overview</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img src="/images/database.png" alt="Database" className="w-24 h-24 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Database</h2>
            <p className="text-gray-600 text-center">Centralized data storage for all CRM entities.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/contacts.png" alt="Contacts" className="w-24 h-24 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Contacts</h2>
            <p className="text-gray-600 text-center">Manage customer and donor information.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/analytics.png" alt="Analytics" className="w-24 h-24 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="text-gray-600 text-center">Visualize campaign and donor performance.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/events.png" alt="Events" className="w-24 h-24 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Events</h2>
            <p className="text-gray-600 text-center">Track fundraising events and milestones.</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <img src="/images/security.png" alt="Security" className="w-16 h-16 inline-block mr-2" />
          <img src="/images/performance.png" alt="Performance" className="w-16 h-16 inline-block mr-2" />
          <img src="/images/global.png" alt="Global Reach" className="w-16 h-16 inline-block" />
          <p className="mt-4 text-gray-500">Security, Performance, and Global Reach are core features of this CRM wireframe.</p>
        </div>
      </div>
    </div>
  );
}
