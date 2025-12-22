
'use client';


import { ArrowLeft, Users, DollarSign, TrendingUp, UserPlus, UserX, Target, Plus, Calendar, Edit, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockDonors as initialMockDonors, mockCampaigns as importedMockCampaigns } from '../../lib/mock-data';

// Ensure correct typing for campaigns
const initialMockCampaigns: Campaign[] = importedMockCampaigns.map(c => ({
  ...c,
  status: c.status as 'active' | 'completed' | 'planned',
}));
import { toast } from 'sonner';

// DonationForm component
interface DonationFormProps {
  donorId?: string;
  onBack: () => void;
  onSave: () => void;
}
export function DonationForm({ donorId, onBack, onSave }: DonationFormProps) {
  const [formData, setFormData] = useState({
    donorId: donorId || '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'credit-card',
    campaignId: '',
    recurring: false,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.donorId || !formData.amount) {
      toast.error('Please fill in required fields');
      return;
    }
    const donor = initialMockDonors.find(d => d.id === formData.donorId);
    const campaign = formData.campaignId
      ? initialMockCampaigns.find(c => c.id === formData.campaignId)
      : null;
    const jsonBody = {
      donorId: formData.donorId,
      amount: parseFloat(formData.amount),
      date: formData.date,
      method: formData.method,
      campaignId: formData.campaignId || null,
      recurring: formData.recurring,
      notes: formData.notes || null,
    };
    console.log('POST /api/donations', JSON.stringify(jsonBody, null, 2));
    if (donor) {
      console.log('📧 Automated Thank You Email Queued:');
      console.log({
        to: donor.email,
        subject: 'Thank You for Your Generous Donation',
        body: `Dear ${donor.name},\n\nThank you for your donation of $${parseFloat(formData.amount).toLocaleString()}!\n\nYour support makes a tremendous difference.`,
        scheduledFor: 'immediate',
      });
    }
    toast.success('Donation logged successfully', {
      description: `Thank you email will be sent to ${donor?.email}`,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:underline bg-transparent border-none p-0">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>
      <div className="max-w-2xl bg-white rounded-lg shadow p-6 border">
        <h2 className="text-xl font-bold mb-2">Log a Donation</h2>
        <p className="mb-4 text-gray-600">Record a new donation. This will trigger a thank-you workflow.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donor Selection */}
          <div className="space-y-2">
            <label htmlFor="donor" className="block font-medium">Donor *</label>
            <select
              id="donor"
              value={formData.donorId}
              onChange={e => setFormData({ ...formData, donorId: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="" disabled>Select a donor</option>
              {initialMockDonors.map(donor => (
                <option key={donor.id} value={donor.id}>
                  {donor.name} - {donor.email}
                </option>
              ))}
            </select>
          </div>
          {/* Amount */}
          <div className="space-y-2">
            <label htmlFor="amount" className="block font-medium">Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="pl-7 w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className="block font-medium">Date *</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Payment Method */}
          <div className="space-y-2">
            <label htmlFor="method" className="block font-medium">Payment Method *</label>
            <select
              id="method"
              value={formData.method}
              onChange={e => setFormData({ ...formData, method: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="credit-card">Credit Card</option>
              <option value="check">Check</option>
              <option value="cash">Cash</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>
          {/* Campaign */}
          <div className="space-y-2">
            <label htmlFor="campaign" className="block font-medium">Campaign (Optional)</label>
            <select
              id="campaign"
              value={formData.campaignId}
              onChange={e => setFormData({ ...formData, campaignId: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">None</option>
              {initialMockCampaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
          {/* Recurring */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label htmlFor="recurring" className="block font-medium">Recurring Donation</label>
              <p className="text-sm text-gray-500">
                This is a recurring monthly donation
              </p>
            </div>
            <input
              id="recurring"
              type="checkbox"
              checked={formData.recurring}
              onChange={e => setFormData({ ...formData, recurring: e.target.checked })}
              className="h-5 w-5"
            />
          </div>
          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block font-medium">Notes</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any relevant notes..."
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {/* JSON Preview */}
          <div className="space-y-2">
            <label className="block font-medium">JSON Body (for POST request):</label>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(
                {
                  donorId: formData.donorId || 'string',
                  amount: formData.amount ? parseFloat(formData.amount) : 0,
                  date: formData.date,
                  method: formData.method,
                  campaignId: formData.campaignId || null,
                  recurring: formData.recurring,
                  notes: formData.notes || null,
                },
                null,
                2
              )}
            </pre>
          </div>
          {/* Submit Button */}
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Log Donation
            </button>
            <button type="button" className="flex-1 border rounded px-4 py-2 hover:bg-gray-100" onClick={onBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



import Link from 'next/link';


// Types
interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalDonated: number;
  lastDonation: string;
  status: 'active' | 'lapsed' | 'major';
  description?: string;
}

interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
}

interface Campaign {
  id: string;
  name: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned';
  description: string;
}

type View = 'dashboard' | 'campaigns' | 'donors';

// Mock Data
// Removed duplicate mockDonors definition; using imported mockDonors

// Removed local mockDonations definition; use imported data or API only.

// Removed duplicate mockCampaigns definition; using imported mockCampaigns

export default function Home() {
  const [showDescription, setShowDescription] = useState<{ open: boolean; donor?: Donor }>({ open: false });
  const [currentView, setCurrentView] = useState<View>('donors');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'lapsed' | 'major'>('all');
  const [donors, setDonors] = useState<Donor[]>([]);
    // Fetch donors from API
    const fetchDonors = async () => {
      try {
        const res = await fetch('/api/donors');
        if (!res.ok) throw new Error('Failed to fetch donors');
        const data = await res.json();
        setDonors(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('Could not load donors from database');
        }
      }
    };

    useEffect(() => {
      fetchDonors();
    }, []);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    // Fetch campaigns from API
    const fetchCampaigns = async () => {
      try {
        const res = await fetch('/api/campaigns');
        if (!res.ok) throw new Error('Failed to fetch campaigns');
        const data = await res.json();
        setCampaigns(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('Could not load campaigns from database');
        }
      }
    };

    useEffect(() => {
      fetchCampaigns();
    }, []);
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [newDonor, setNewDonor] = useState({ name: '', email: '', phone: '', totalDonated: 0, lastDonation: '', status: 'active' });
  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, 'id'>>({ name: '', goal: 0, raised: 0, startDate: '', endDate: '', status: 'planned', description: '' });

  const totalDonors = 6;
  const activeDonors = 4;
  const newDonors = 1;
  const lapsedDonors = 1;
  const raisedThisMonth = 0;
  const donationsThisMonth = 0;

  const renderContent = () => {
    if (currentView === 'dashboard') {
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-600">Overview of your fundraising activities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Raised This Month</p>
              <p className="text-2xl font-bold mb-1">${raisedThisMonth.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{donationsThisMonth} donations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Donors</p>
              <p className="text-2xl font-bold mb-1">{totalDonors}</p>
              <p className="text-xs text-gray-500">{activeDonors} active</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserPlus className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">New Donors</p>
              <p className="text-2xl font-bold mb-1">{newDonors}</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserX className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Lapsed Donors</p>
              <p className="text-2xl font-bold mb-1">{lapsedDonors}</p>
              <p className="text-xs text-gray-500">Need follow-up</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold">Active Campaigns</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Track progress toward your fundraising goals</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {campaigns.filter((c: Campaign) => c.status === 'active').map((campaign: Campaign) => {
                const percentage = (campaign.raised / campaign.goal) * 100;
                
                return (
                  <div key={campaign.id} className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="font-semibold mb-4">{campaign.name}</h3>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()} goal
                        </span>
                        <span className="font-semibold">{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-1">Recent Donations</h2>
              <p className="text-sm text-gray-600 mb-4">Latest contributions received</p>
              <div className="space-y-3">
                {/* No mockDonations available. Replace with real donation data or remove this section. */}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-1">Top Donors</h2>
              <p className="text-sm text-gray-600 mb-4">By total giving</p>
              <div className="space-y-3">
                {initialMockDonors.slice(0, 5).map(donor => (
                  <div key={donor.id} className="flex justify-between items-start py-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-sm text-gray-500">{donor.email}</p>
                    </div>
                    <p className="font-semibold text-lg">${donor.totalDonated.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentView === 'campaigns') {
      const activeCampaigns = campaigns.filter((c: Campaign) => c.status === 'active');
      const completedCampaigns = campaigns.filter((c: Campaign) => c.status === 'completed');
      const plannedCampaigns = campaigns.filter((c: Campaign) => c.status === 'planned');

      const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
        const percentage = (campaign.raised / campaign.goal) * 100;

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
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4 text-gray-600" />
                </button>
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
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      campaign.status === 'completed' ? 'bg-blue-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  ${(campaign.goal - campaign.raised).toLocaleString()} remaining
                </span>
                {campaign.status === 'active' && (
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View Details →
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      };

      return (
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">Campaigns</h1>
              <p className="text-gray-600">Manage your fundraising campaigns</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors" onClick={() => setShowAddCampaign(true)}>
              <Plus className="h-4 w-4" />
              New Campaign
            </button>
          </div>

          {activeCampaigns.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                Active Campaigns
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeCampaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign as Campaign} />
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
                  <CampaignCard key={campaign.id} campaign={campaign as Campaign} />
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
                  <CampaignCard key={campaign.id} campaign={campaign as Campaign} />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Donors view
    const filteredDonors = donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || donor.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="space-y-6">
        {/* Donor Description Overlay */}
        {showDescription.open && showDescription.donor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowDescription({ open: false })}>
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold mb-2">{showDescription.donor.name}'s Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {typeof showDescription.donor.description === 'string' && showDescription.donor.description.trim()
                  ? showDescription.donor.description
                  : 'No description provided.'}
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-1">Donors</h1>
            <p className="text-gray-600">Manage your donor relationships</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors" onClick={() => setShowAddDonor(true)}>
            <Plus className="h-4 w-4" />
            Add Donor
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Donors</option>
                <option value="active">Active</option>
                <option value="major">Major Donors</option>
                <option value="lapsed">Lapsed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Donors</p>
            <p className="text-2xl font-bold">{donors.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {donors.filter(d => d.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Major Donors</p>
            <p className="text-2xl font-bold text-purple-600">
              {donors.filter(d => d.status === 'major').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Lapsed</p>
            <p className="text-2xl font-bold text-orange-600">
              {donors.filter(d => d.status === 'lapsed').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Donated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Donation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonors.length > 0 ? (
                  filteredDonors.map(donor => (
                    <tr key={donor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{donor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{donor.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{donor.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${donor.totalDonated.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{donor.lastDonation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          donor.status === 'major' ? 'bg-purple-100 text-purple-800' :
                          donor.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 font-medium"
                          onClick={() => {
                            // Find the latest donor object with description
                            const found = donors.find(d => d.id === donor.id) || donor;
                            setShowDescription({ open: true, donor: found });
                          }}
                        >
                          View
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 font-medium"
                          onClick={async () => {
                            if (confirm(`Delete donor ${donor.name}? This cannot be undone.`)) {
                              try {
                                const res = await fetch('/api/donors', {
                                  method: 'DELETE',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ id: donor.id }),
                                });
                                const result = await res.json();
                                if (!res.ok) {
                                  toast.error(result.error || 'Failed to delete donor');
                                  return;
                                }
                                toast.success('Donor deleted');
                                await fetchDonors();
                              } catch (err: unknown) {
                                if (err instanceof Error) {
                                  toast.error(err.message);
                                } else {
                                  toast.error('Failed to delete donor');
                                }
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No donors found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-sm text-gray-600 text-center">
          Showing {filteredDonors.length} of {donors.length} donors
        </div>

        {showAddDonor && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Donor</h2>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 mb-8 border border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Add New Donor</h2>
                  <form onSubmit={async e => {
                    e.preventDefault();
                    try {
                      const res = await fetch('/api/donors', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newDonor),
                      });
                      const result = await res.json();
                      if (!res.ok) {
                        toast.error(result.error || 'Failed to add donor');
                        return;
                      }
                      await fetchDonors();
                      setShowAddDonor(false);
                      setNewDonor({ name: '', email: '', phone: '', totalDonated: 0, lastDonation: '', status: 'active' });
                    } catch (err) {
                      // Try to show backend error message if available
                      if (err instanceof Response) {
                        const data = await err.json().catch(() => null);
                        toast.error(data?.error || 'Failed to add donor');
                      } else if (err instanceof Error) {
                        toast.error(err.message);
                      } else {
                        toast.error('Failed to add donor');
                      }
                    }
                  }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input placeholder="Name" value={newDonor.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, name: e.target.value })} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input placeholder="Email" value={newDonor.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, email: e.target.value })} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input placeholder="Phone" value={newDonor.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, phone: e.target.value })} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Donated</label>
                      <input placeholder="Total Donated" type="number" value={newDonor.totalDonated} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, totalDonated: Number(e.target.value) })} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation</label>
                      <input type="date" value={newDonor.lastDonation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, lastDonation: e.target.value })} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={newDonor.status} onChange={e => setNewDonor({ ...newDonor, status: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none">
                        <option value="active">Active</option>
                        <option value="major">Major</option>
                        <option value="lapsed">Lapsed</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Add</button>
                      <button type="button" onClick={() => setShowAddDonor(false)} className="flex-1 border border-gray-300 py-2 px-4 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 transition">Cancel</button>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        )}
        {showAddCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Campaign</h2>
              <form onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await fetch('/api/campaigns', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCampaign),
                  });
                  const result = await res.json();
                  if (!res.ok) {
                    toast.error(result.error || 'Failed to add campaign');
                    return;
                  }
                  await fetchCampaigns();
                  setShowAddCampaign(false);
                  setNewCampaign({ name: '', goal: 0, raised: 0, startDate: '', endDate: '', status: 'planned', description: '' });
                } catch (err) {
                  // Try to show backend error message if available
                  if (err instanceof Response) {
                    const data = await err.json().catch(() => null);
                    toast.error(data?.error || 'Failed to add campaign');
                  } else if (err instanceof Error) {
                    toast.error(err.message);
                  } else {
                    toast.error('Failed to add campaign');
                  }
                }
              }} className="space-y-4">
                <input placeholder="Name" value={newCampaign.name} onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })} required className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="Goal" type="number" value={newCampaign.goal} onChange={e => setNewCampaign({ ...newCampaign, goal: Number(e.target.value) })} required className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="Raised" type="number" value={newCampaign.raised} onChange={e => setNewCampaign({ ...newCampaign, raised: Number(e.target.value) })} required className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="Start Date" type="date" value={newCampaign.startDate} onChange={e => setNewCampaign({ ...newCampaign, startDate: e.target.value })} required className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="End Date" type="date" value={newCampaign.endDate} onChange={e => setNewCampaign({ ...newCampaign, endDate: e.target.value })} required className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="Description" value={newCampaign.description} onChange={e => setNewCampaign({ ...newCampaign, description: e.target.value })} required className="w-full px-4 py-2 border rounded-lg" />
                <select value={newCampaign.status} onChange={e => setNewCampaign({ ...newCampaign, status: e.target.value as 'active' | 'completed' | 'planned' })} className="w-full px-4 py-2 border rounded-lg">
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Add</button>
                  <button type="button" onClick={() => setShowAddCampaign(false)} className="flex-1 border border-gray-300 py-2 px-4 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 transition">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <h2 className="font-semibold text-lg">Donor Management System</h2>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/dashboard" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100">Dashboard</Link>
            <Link href="/donor-list" className="px-4 py-2 rounded-lg transition-colors bg-blue-600 text-white">Donors</Link>
            <Link href="/campaigns" className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100">Campaigns</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-1">Donor Management System © 2025</p>
          <p>All data is currently mock data. Connect to a database for persistence.</p>
        </div>
      </footer>
    </div>
  );
}