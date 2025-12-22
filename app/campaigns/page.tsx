'use client';

import { useState, useEffect } from 'react';
import { 
  Plus,
  Calendar,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Types
interface Campaign {
  id: number;
  name: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned';
  description: string;
}

// Type guard to ensure only valid campaigns are used in charts
function isValidCampaign(c: any): c is Campaign {
  return (
    typeof c === 'object' &&
    typeof c.id === 'number' &&
    typeof c.name === 'string' &&
    typeof c.goal === 'number' &&
    typeof c.raised === 'number' &&
    typeof c.startDate === 'string' &&
    typeof c.endDate === 'string' &&
    typeof c.status === 'string' &&
    typeof c.description === 'string'
  );
}

// Remove local mock campaigns. Use API instead.

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns from API
  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/campaigns');
      if (!res.ok) throw new Error('Failed to fetch campaigns');
      const data = await res.json();
      setCampaigns(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCampaigns();
  }, []);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'stacked'>('bar');

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowCampaignModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const CampaignModal = ({ isOpen, onClose, campaign }: { isOpen: boolean; onClose: () => void; campaign?: Campaign | null }) => {
    const [formData, setFormData] = useState<Campaign>(
      campaign || {
        id: 0,
        name: '',
        goal: 0,
        raised: 0,
        startDate: '',
        endDate: '',
        status: 'planned',
        description: ''
      }
    );
    const [submitting, setSubmitting] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setModalError(null);
      try {
        // Validate date format (YYYY-MM-DD) and reasonable year range
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(formData.startDate) || !dateRegex.test(formData.endDate)) {
          setModalError('Dates must be in YYYY-MM-DD format.');
          setSubmitting(false);
          return;
        }
        const startYear = Number(formData.startDate.split('-')[0]);
        const endYear = Number(formData.endDate.split('-')[0]);
        if (startYear < 1900 || startYear > 2100 || endYear < 1900 || endYear > 2100) {
          setModalError('Year must be between 1900 and 2100.');
          setSubmitting(false);
          return;
        }
        const payload = {
          name: formData.name,
          goal: formData.goal,
          raised: formData.raised,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          description: formData.description,
        };
        console.log('Submitting campaign payload:', payload);
        const res = await fetch('/api/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (!res.ok) {
          setModalError(result.error || 'Failed to add campaign');
          setSubmitting(false);
          return;
        }
        await fetchCampaigns();
        onClose();
        setEditingCampaign(null);
      } catch (err: any) {
        setModalError(err.message || 'Failed to add campaign');
      } finally {
        setSubmitting(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{campaign ? 'Edit Campaign' : 'New Campaign'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe your campaign"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Goal Amount ($)</label>
                <input
                  type="number"
                  required
                  value={formData.goal || ''}
                  onChange={(e) => setFormData({ ...formData, goal: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Amount ($)</label>
                <input
                  type="number"
                  required
                  value={formData.raised || ''}
                  onChange={(e) => setFormData({ ...formData, raised: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  min="1900-01-01"
                  max="2100-12-31"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  required
                  min="1900-01-01"
                  max="2100-12-31"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {modalError && (
              <div className="text-red-600 text-sm">{modalError}</div>
            )}
            {formData.status === 'planned' && (
              <button
                type="button"
                className="w-full bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition-colors mb-2"
                disabled={submitting}
                onClick={async () => {
                  try {
                    const res = await fetch('/api/campaigns', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: formData.id, status: 'active' }),
                    });
                    if (!res.ok) throw new Error('Failed to activate campaign');
                    setFormData({ ...formData, status: 'active' });
                    await fetchCampaigns();
                  } catch (err) {
                    alert('Could not activate campaign.');
                  }
                }}
              >
                Make Active
              </button>
            )}
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : campaign ? 'Save Changes' : 'Create Campaign'}
              </button>
              <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
    const percentage = (campaign.raised / campaign.goal) * 100;
    const [activating, setActivating] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const handleActivate = async () => {
      setActivating(true);
      try {
        const res = await fetch(`/api/campaigns`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: campaign.id, status: 'active' }),
        });
        if (!res.ok) throw new Error('Failed to activate campaign');
        await fetchCampaigns();
      } catch (err) {
        alert('Could not activate campaign.');
      } finally {
        setActivating(false);
      }
    };
    return (
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{campaign.name}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600">{campaign.description}</p>
          </div>
          <div className="flex gap-2 ml-4">
            <button onClick={() => handleEdit(campaign)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
            <button onClick={() => handleDelete(campaign.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
            {campaign.status === 'planned' && (
              <button
                onClick={handleActivate}
                className="p-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors"
                disabled={activating}
                title="Activate Campaign"
              >
                {activating ? 'Activating...' : 'Make Active'}
              </button>
            )}
          </div>
        </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{campaign.startDate} - {campaign.endDate}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    ${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
                  </span>
                  <span className="font-semibold">{Math.round(percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      campaign.status === 'completed' ? 'bg-blue-600' : 'bg-green-600'
                    }`}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center text-sm">
                <span className="text-gray-600">${(campaign.goal - campaign.raised).toLocaleString()} remaining</span>
                {campaign.status === 'active' && (
                  <button
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setShowDetails(true)}
                  >
                    View Details →
                  </button>
                )}
              </div>
            </div>
            {showDetails && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowDetails(false)}>
                <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg" onClick={e => e.stopPropagation()}>
                  <h3 className="text-xl font-bold mb-4">Campaign Details</h3>
                  <div className="mb-2">
                    <span className="font-semibold">Description:</span>
                    <div className="text-gray-700 mt-1">{campaign.description}</div>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Start Date:</span>
                    <span className="ml-2 text-gray-700">{campaign.startDate}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">End Date:</span>
                    <span className="ml-2 text-gray-700">{campaign.endDate}</span>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={() => setShowDetails(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
      </div>
    );
  };

  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');
  const plannedCampaigns = campaigns.filter(c => c.status === 'planned');

  return (
    <div className="space-y-8 p-8">
      {showCampaignModal && (
        <CampaignModal
          isOpen={showCampaignModal}
          onClose={() => setShowCampaignModal(false)}
          campaign={editingCampaign}
        />
      )}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-1">Campaigns</h1>
          <p className="text-gray-600">Manage your fundraising campaigns</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => window.location.href = '/donor-list'}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Donor List
          </button>
          <button
            onClick={() => {
              setEditingCampaign(null);
              setShowCampaignModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Campaign Overview</h2>
          <div className="relative">
            <button
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
              onClick={() => {
                // Cycle chart type: bar -> pie -> stacked -> bar
                setChartType(prev => prev === 'bar' ? 'pie' : prev === 'pie' ? 'stacked' : 'bar');
              }}
              title="Change Chart Type"
            >
              Chart: {chartType === 'bar' ? 'Bar' : chartType === 'pie' ? 'Pie' : 'Stacked'}
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'bar' && (() => {
            const chartData = Array.isArray(campaigns) ? campaigns.filter(isValidCampaign).filter(c => c.status === 'active' || c.status === 'completed') : [];
            console.log('BarChart data:', chartData);
            return (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="raised" fill="#8884d8" />
                <Bar dataKey="goal" fill="#82ca9d" />
              </BarChart>
            );
          })()}
          {chartType === 'pie' && (
            (() => {
              // Map Campaigns to plain objects for recharts compatibility
              const pieData = Array.isArray(campaigns)
                ? campaigns.filter(isValidCampaign).filter((c): c is Campaign => c.status === 'active' || c.status === 'completed')
                  .map(c => ({
                    name: c.name,
                    raised: c.raised,
                    goal: c.goal,
                    id: c.id,
                    startDate: c.startDate,
                    endDate: c.endDate,
                    status: c.status,
                    description: c.description
                  }))
                : [];
              return (
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="raised"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              );
            })()
          )}
          {chartType === 'stacked' && (
            <BarChart data={Array.isArray(campaigns) ? campaigns.filter(isValidCampaign).filter(c => c.status === 'active' || c.status === 'completed') : []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="raised" stackId="a" fill="#8884d8" />
              <Bar dataKey="goal" stackId="a" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Campaign lists below the chart */}
      {activeCampaigns.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            Active Campaigns
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      )}
      {plannedCampaigns.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            Planned Campaigns
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {plannedCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      )}
      {completedCampaigns.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            Completed Campaigns
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {completedCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
