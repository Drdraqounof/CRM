'use client';


import { ArrowLeft, Users, DollarSign, TrendingUp, UserPlus, UserX, Target, Plus, Calendar, Edit, Trash2, X, Sparkles, Settings, LogOut, Shield, User, Tag } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockDonors as initialMockDonors, mockCampaigns as importedMockCampaigns } from '../../lib/mock-data';
import Sidebar from '../components/Sidebar';
import { useTheme } from '@/lib/useTheme';
import { filterDonorsByGroup, getBuiltInGroups } from '@/lib/groupFilters';


// Ensure correct typing for campaigns
const initialMockCampaigns: Campaign[] = importedMockCampaigns.map(c => ({
  ...c,
  status: c.status as 'active' | 'completed' | 'planned' | 'postponed',
}));
import { toast } from 'sonner';

// DonationForm component
interface DonationFormProps {
  donorId?: string;
  onBack: () => void;
  onSave: () => void;
  themeConfig: any;
}
export function DonationForm({ donorId, onBack, onSave, themeConfig }: DonationFormProps) {
  const [formData, setFormData] = useState({
    donorId: donorId || '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'credit-card',
    campaignId: '',
    recurring: false,
    notes: '',
  });
  const [donorSearch, setDonorSearch] = useState('');
  const [showDonorDropdown, setShowDonorDropdown] = useState(false);

  const filteredDonors = initialMockDonors.filter(donor =>
    donor.name.toLowerCase().includes(donorSearch.toLowerCase()) ||
    donor.email.toLowerCase().includes(donorSearch.toLowerCase())
  );

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
      <div className={`max-w-2xl ${themeConfig.surface} rounded-lg shadow p-6 border ${themeConfig.border}`}>
        <h2 className={`text-xl font-bold mb-2 ${themeConfig.text}`}>Log a Donation</h2>
        <p className={`mb-4 ${themeConfig.textSecondary}`}>Record a new donation. This will trigger a thank-you workflow.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donor Selection with Search */}
          <div className="space-y-2">
            <label htmlFor="donor-search" className={`block font-medium ${themeConfig.text}`}>Donor *</label>
            <div className="relative">
              <input
                id="donor-search"
                type="text"
                placeholder="Search by name or email..."
                value={donorSearch}
                onChange={(e) => {
                  setDonorSearch(e.target.value);
                  setShowDonorDropdown(true);
                }}
                onFocus={() => setShowDonorDropdown(true)}
                className={`w-full border ${themeConfig.border} rounded px-3 py-2 ${themeConfig.surface} ${themeConfig.text}`}
              />
              {showDonorDropdown && donorSearch && (
                <div className={`absolute top-full left-0 right-0 mt-1 border ${themeConfig.border} rounded shadow-lg ${themeConfig.surface} z-10 max-h-48 overflow-y-auto`}>
                  {filteredDonors.length > 0 ? (
                    filteredDonors.map(donor => (
                      <button
                        key={donor.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, donorId: donor.id });
                          setDonorSearch(`${donor.name} - ${donor.email}`);
                          setShowDonorDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:${themeConfig.accent} border-b ${themeConfig.border} last:border-b-0 ${themeConfig.text}`}
                      >
                        <div className="font-medium">{donor.name}</div>
                        <div className={`text-sm ${themeConfig.textSecondary}`}>{donor.email}</div>
                      </button>
                    ))
                  ) : (
                    <div className={`px-3 py-2 ${themeConfig.textSecondary} text-center`}>
                      No donors found
                    </div>
                  )}
                </div>
              )}
            </div>
            {formData.donorId && (
              <p className={`text-sm ${themeConfig.textSecondary}`}>
                Selected: {initialMockDonors.find(d => d.id === formData.donorId)?.name}
              </p>
            )}
          </div>
          {/* Amount */}
          <div className="space-y-2">
            <label htmlFor="amount" className={`block font-medium ${themeConfig.text}`}>Amount *</label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeConfig.textSecondary}`}>$</span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className={`pl-7 w-full border ${themeConfig.border} rounded px-3 py-2 ${themeConfig.surface} ${themeConfig.text}`}
                required
              />
            </div>
          </div>
          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className={`block font-medium ${themeConfig.text}`}>Date *</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className={`w-full border ${themeConfig.border} rounded px-3 py-2 ${themeConfig.surface} ${themeConfig.text}`}
              required
            />
          </div>
          {/* Payment Method */}
          <div className="space-y-2">
            <label htmlFor="method" className={`block font-medium ${themeConfig.text}`}>Payment Method *</label>
            <select
              id="method"
              value={formData.method}
              onChange={e => setFormData({ ...formData, method: e.target.value })}
              className={`w-full border ${themeConfig.border} rounded px-3 py-2 ${themeConfig.surface} ${themeConfig.text}`}
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
            <label htmlFor="campaign" className={`block font-medium ${themeConfig.text}`}>Campaign (Optional)</label>
            <select
              id="campaign"
              value={formData.campaignId}
              onChange={e => setFormData({ ...formData, campaignId: e.target.value })}
              className={`w-full border ${themeConfig.border} rounded px-3 py-2 ${themeConfig.surface} ${themeConfig.text}`}
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
          <div className={`flex items-center justify-between rounded-lg border ${themeConfig.border} p-4 ${themeConfig.surface}`}>
            <div className="space-y-0.5">
              <label htmlFor="recurring" className={`block font-medium ${themeConfig.text}`}>Recurring Donation</label>
              <p className={`text-sm ${themeConfig.textSecondary}`}>
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
            <label htmlFor="notes" className={`block font-medium ${themeConfig.text}`}>Notes</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any relevant notes..."
              rows={3}
              className={`w-full border ${themeConfig.border} rounded px-3 py-2 ${themeConfig.surface} ${themeConfig.text}`}
            />
          </div>
          {/* JSON Preview */}
          <div className="space-y-2">
            <label className={`block font-medium ${themeConfig.text}`}>JSON Body (for POST request):</label>
            <pre className={`${themeConfig.accent} p-4 rounded-lg text-xs overflow-x-auto ${themeConfig.text}`}>
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
            <button type="submit" className={`flex-1 ${themeConfig.primary} ${themeConfig.primaryText} px-4 py-2 rounded hover:opacity-90 transition-opacity`}>
              Log Donation
            </button>
            <button type="button" className={`flex-1 border ${themeConfig.border} rounded px-4 py-2 hover:${themeConfig.accent}`} onClick={onBack}>
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
  createdAt?: string;
  donations?: Donation[];
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
  status: 'active' | 'completed' | 'planned' | 'postponed';
  description: string;
}

type View = 'dashboard' | 'campaigns' | 'donors';

// Mock Data
// Removed duplicate mockDonors definition; using imported mockDonors

// Removed local mockDonations definition; use imported data or API only.

// Removed duplicate mockCampaigns definition; using imported mockCampaigns

function DonorListContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('group');
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
  const [showEditDonor, setShowEditDonor] = useState<{ open: boolean; donor?: Donor }>({ open: false });
  const [newDonor, setNewDonor] = useState({ name: '', email: '', phone: '', totalDonated: '' as string | number, lastDonation: '', description: '', status: 'active' });
  const [editDonor, setEditDonor] = useState({ name: '', email: '', phone: '', totalDonated: '' as string | number, lastDonation: '', description: '', status: 'active' as 'active' | 'lapsed' | 'major' });
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
            <h1 className={`text-3xl font-bold mb-1 ${themeConfig.text}`}>Dashboard</h1>
            <p className={themeConfig.textSecondary}>Overview of your fundraising activities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 ${themeConfig.primary} rounded-lg`}>
                  <DollarSign className={`h-5 w-5 ${themeConfig.primaryText}`} />
                </div>
              </div>
              <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Raised This Month</p>
              <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>${raisedThisMonth.toLocaleString()}</p>
              <p className={`text-xs ${themeConfig.textSecondary}`}>{donationsThisMonth} donations</p>
            </div>
            
            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 ${themeConfig.primary} rounded-lg`}>
                  <Users className={`h-5 w-5 ${themeConfig.primaryText}`} />
                </div>
              </div>
              <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Total Donors</p>
              <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{totalDonors}</p>
              <p className={`text-xs ${themeConfig.textSecondary}`}>{activeDonors} active</p>
            </div>
            
            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 ${themeConfig.primary} rounded-lg`}>
                  <UserPlus className={`h-5 w-5 ${themeConfig.primaryText}`} />
                </div>
              </div>
              <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>New Donors</p>
              <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{newDonors}</p>
              <p className={`text-xs ${themeConfig.textSecondary}`}>This month</p>
            </div>
            
            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 ${themeConfig.primary} rounded-lg`}>
                  <UserX className={`h-5 w-5 ${themeConfig.primaryText}`} />
                </div>
              </div>
              <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Lapsed Donors</p>
              <p className={`text-2xl font-bold mb-1 ${themeConfig.text}`}>{lapsedDonors}</p>
              <p className={`text-xs ${themeConfig.textSecondary}`}>Need follow-up</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className={`h-5 w-5 ${themeConfig.text}`} />
              <h2 className={`text-xl font-semibold ${themeConfig.text}`}>Active Campaigns</h2>
            </div>
            <p className={`text-sm ${themeConfig.textSecondary} mb-4`}>Track progress toward your fundraising goals</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {campaigns.filter((c: Campaign) => c.status === 'active').map((campaign: Campaign) => {
                const percentage = (campaign.raised / campaign.goal) * 100;
                
                return (
                  <div key={campaign.id} className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
                    <h3 className={`font-semibold mb-4 ${themeConfig.text}`}>{campaign.name}</h3>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={themeConfig.textSecondary}>
                          ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()} goal
                        </span>
                        <span className={`font-semibold ${themeConfig.text}`}>{Math.round(percentage)}%</span>
                      </div>
                      <div className={`w-full ${themeConfig.accent} rounded-full h-2.5`}>
                        <div
                          className={`${themeConfig.primary} h-2.5 rounded-full transition-all`}
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
            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-1 ${themeConfig.text}`}>Recent Donations</h2>
              <p className={`text-sm ${themeConfig.textSecondary} mb-4`}>Latest contributions received</p>
              <div className="space-y-3">
                {/* No mockDonations available. Replace with real donation data or remove this section. */}
              </div>
            </div>

            <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-1 ${themeConfig.text}`}>Top Donors</h2>
              <p className={`text-sm ${themeConfig.textSecondary} mb-4`}>By total giving</p>
              <div className="space-y-3">
                {initialMockDonors.slice(0, 5).map(donor => (
                  <div key={donor.id} className={`flex justify-between items-start py-3 border-b ${themeConfig.border} last:border-0`}>
                    <div className="flex-1">
                      <p className={`font-medium ${themeConfig.text}`}>{donor.name}</p>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>{donor.email}</p>
                    </div>
                    <p className={`font-semibold text-lg ${themeConfig.text}`}>${donor.totalDonated.toLocaleString()}</p>
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
          <div className={`${themeConfig.surface} p-6 rounded-lg border ${themeConfig.border} shadow-sm`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-semibold text-lg ${themeConfig.text}`}>{campaign.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    campaign.status === 'postponed' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <p className={`text-sm ${themeConfig.textSecondary}`}>{campaign.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button className={`p-2 hover:${themeConfig.accent} rounded-lg transition-colors`}>
                  <Edit className={`h-4 w-4 ${themeConfig.textSecondary}`} />
                </button>
                <button className={`p-2 hover:${themeConfig.accent} rounded-lg transition-colors`}>
                  <Trash2 className={`h-4 w-4 ${themeConfig.textSecondary}`} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className={`flex items-center gap-2 text-sm ${themeConfig.textSecondary}`}>
                <Calendar className="h-4 w-4" />
                <span>{campaign.startDate} - {campaign.endDate}</span>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className={themeConfig.textSecondary}>
                    ${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
                  </span>
                  <span className={`font-semibold ${themeConfig.text}`}>{Math.round(percentage)}%</span>
                </div>
                <div className={`w-full ${themeConfig.accent} rounded-full h-3`}>
                  <div
                    className={`h-3 rounded-full transition-all ${
                      campaign.status === 'completed' ? 'bg-blue-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-sm">
                <span className={themeConfig.textSecondary}>
                  ${(campaign.goal - campaign.raised).toLocaleString()} remaining
                </span>
                {campaign.status === 'active' && (
                  <button className={`${themeConfig.primaryText} hover:opacity-80 font-medium`}>
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
              <h1 className={`text-3xl font-bold mb-1 ${themeConfig.text}`}>Campaigns</h1>
              <p className={themeConfig.textSecondary}>Manage your fundraising campaigns</p>
            </div>
            <button className={`${themeConfig.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`} onClick={() => setShowAddCampaign(true)}>
              <Plus className="h-4 w-4" />
              New Campaign
            </button>
          </div>

          {activeCampaigns.length > 0 && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${themeConfig.text}`}>
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
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${themeConfig.text}`}>
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
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${themeConfig.text}`}>
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
    // Group filtering functions
    const getGroupFilter = (groupId: string | null) => {
      if (!groupId) return () => true;
      
      const now = new Date();
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      switch (groupId) {
        case '1': // Major Donors
          return (d: Donor) => (d.totalDonated || 0) >= 10000;
        case '2': // Active Monthly Givers
          return (d: Donor) => {
            const lastDonation = d.lastDonation ? new Date(d.lastDonation) : null;
            return lastDonation && lastDonation >= thirtyDaysAgo && d.status === 'active';
          };
        case '3': // Lapsed Donors
          return (d: Donor) => {
            const lastDonation = d.lastDonation ? new Date(d.lastDonation) : null;
            return lastDonation && lastDonation < sixMonthsAgo && d.status === 'lapsed';
          };
        case '4': // First-Time Donors
          return (d: Donor) => {
            const createdAt = d.createdAt ? new Date(d.createdAt) : null;
            return createdAt && createdAt >= startOfYear;
          };
        case '5': // Event Attendees
          return (d: Donor) =>
            d.description?.toLowerCase().includes('event') ||
            d.description?.toLowerCase().includes('gala') ||
            d.description?.toLowerCase().includes('attendee') ||
            false;
        default:
          return () => true;
      }
    };

    const getGroupName = (groupId: string | null) => {
      switch (groupId) {
        case '1': return 'Major Donors';
        case '2': return 'Active Monthly Givers';
        case '3': return 'Lapsed Donors';
        case '4': return 'First-Time Donors';
        case '5': return 'Event Attendees';
        default: return null;
      }
    };

    const groupFilter = getGroupFilter(groupId);
    const groupName = getGroupName(groupId);

    const filteredDonors = donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || donor.status === filterStatus;
      const matchesGroup = groupFilter(donor);
      return matchesSearch && matchesFilter && matchesGroup;
    });

    return (
      <div className="space-y-6">
        {/* Donor Description Overlay */}
        {showDescription.open && showDescription.donor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`${themeConfig.surface} rounded-lg shadow-lg p-8 max-w-lg w-full relative border ${themeConfig.border}`}>
              <button className={`absolute top-2 right-2 ${themeConfig.textSecondary} hover:${themeConfig.text}`} onClick={() => setShowDescription({ open: false })}>
                <X className="h-5 w-5" />
              </button>
              <h2 className={`text-2xl font-bold mb-2 ${themeConfig.text}`}>{showDescription.donor.name}</h2>
              <p className={`mb-2 ${themeConfig.textSecondary}`}>{showDescription.donor.email} {showDescription.donor.phone ? `| ${showDescription.donor.phone}` : ''}</p>
              <div className="mb-4">
                <span className="font-semibold">Description: </span>
                <span className={`block ${themeConfig.text} whitespace-pre-line mt-1`}>
                  {typeof showDescription.donor.description === 'string' && showDescription.donor.description.trim()
                    ? showDescription.donor.description
                    : 'No description provided.'}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Total Donated: </span>
                <span className={themeConfig.text}>${showDescription.donor.totalDonated?.toLocaleString?.() ?? '0'}</span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Last Donation: </span>
                <span className={themeConfig.text}>{showDescription.donor.lastDonation ? new Date(showDescription.donor.lastDonation).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="mb-6">
                <span className="font-semibold">Recent Donations: </span>
                <ul className="list-disc ml-6 mt-1">
                  {/* Replace with real donation data if available */}
                  {showDescription.donor.donations && showDescription.donor.donations.length > 0 ? (
                    showDescription.donor.donations.slice(0, 5).map((don, idx) => (
                      <li key={don.id} className={themeConfig.textSecondary}>
                        ${don.amount} on {new Date(don.date).toLocaleDateString()}
                      </li>
                    ))
                  ) : (
                    <li className={themeConfig.textSecondary}>No recent donations found.</li>
                  )}
                </ul>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (!showDescription.donor) return;
                    // Convert lastDonation to YYYY-MM-DD format for the date input
                    const formatDateForInput = (dateStr: string) => {
                      if (!dateStr) return '';
                      const date = new Date(dateStr);
                      // Adjust for local timezone to avoid off-by-one day issues
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      return `${year}-${month}-${day}`;
                    };
                    setEditDonor({
                      name: showDescription.donor.name,
                      email: showDescription.donor.email,
                      phone: showDescription.donor.phone,
                      totalDonated: showDescription.donor.totalDonated,
                      lastDonation: formatDateForInput(showDescription.donor.lastDonation),
                      description: showDescription.donor.description || '',
                      status: showDescription.donor.status,
                    });
                    setShowEditDonor({ open: true, donor: showDescription.donor });
                    setShowDescription({ open: false });
                  }}
                  className={`flex-1 ${themeConfig.primary} text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDescription({ open: false })}
                  className={`flex-1 border ${themeConfig.border} rounded px-4 py-2 hover:${themeConfig.accent}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            {groupName ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <a href="/donor-list" className={`${themeConfig.primaryText} hover:underline text-sm flex items-center gap-1`}>
                    <ArrowLeft className="h-4 w-4" />
                    All Donors
                  </a>
                  <span className={themeConfig.textSecondary}>/</span>
                  <span className={`text-sm ${themeConfig.textSecondary}`}>Group</span>
                </div>
                <h1 className={`text-3xl font-bold mb-1 flex items-center gap-3 ${themeConfig.text}`}>
                  <Tag className={`h-7 w-7 ${themeConfig.primaryText}`} />
                  {groupName}
                </h1>
                <p className={themeConfig.textSecondary}>Viewing {filteredDonors.length} donors in this group</p>
              </>
            ) : (
              <>
                <h1 className={`text-3xl font-bold mb-1 ${themeConfig.text}`}>Donors</h1>
                <p className={themeConfig.textSecondary}>Manage your donor relationships</p>
              </>
            )}
          </div>
          <button className={`${themeConfig.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`} onClick={() => setShowAddDonor(true)}>
            <Plus className="h-4 w-4" />
            Add Donor
          </button>
        </div>

        <div className={`${themeConfig.surface} p-4 rounded-lg border ${themeConfig.border} shadow-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeConfig.text}`}>Search</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeConfig.surface} ${themeConfig.text}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeConfig.text}`}>Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeConfig.surface} ${themeConfig.text}`}
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
          <div className={`${themeConfig.surface} p-4 rounded-lg border ${themeConfig.border} shadow-sm`}>
            <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Total Donors</p>
            <p className={`text-2xl font-bold ${themeConfig.text}`}>{donors.length}</p>
          </div>
          <div className={`${themeConfig.surface} p-4 rounded-lg border ${themeConfig.border} shadow-sm`}>
            <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Active</p>
            <p className="text-2xl font-bold text-green-600">
              {donors.filter(d => d.status === 'active').length}
            </p>
          </div>
          <div className={`${themeConfig.surface} p-4 rounded-lg border ${themeConfig.border} shadow-sm`}>
            <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Major Donors</p>
            <p className="text-2xl font-bold text-purple-600">
              {donors.filter(d => d.status === 'major').length}
            </p>
          </div>
          <div className={`${themeConfig.surface} p-4 rounded-lg border ${themeConfig.border} shadow-sm`}>
            <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>Lapsed</p>
            <p className="text-2xl font-bold text-orange-600">
              {donors.filter(d => d.status === 'lapsed').length}
            </p>
          </div>
        </div>

        <div className={`${themeConfig.surface} rounded-lg border ${themeConfig.border} shadow-sm overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${themeConfig.accent} border-b ${themeConfig.border}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Name
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Email
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Phone
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Total Donated
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Last Donation
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${themeConfig.textSecondary} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${themeConfig.surface} divide-y ${themeConfig.border}`}>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map(donor => (
                    <tr key={donor.id} className={`hover:${themeConfig.accent}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`font-medium ${themeConfig.text}`}>{donor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${themeConfig.textSecondary}`}>{donor.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${themeConfig.textSecondary}`}>{donor.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${themeConfig.text}`}>
                          ${donor.totalDonated.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${themeConfig.textSecondary}`}>{donor.lastDonation}</div>
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
                          className="text-green-600 hover:text-green-900 font-medium"
                          onClick={() => {
                            const found = donors.find(d => d.id === donor.id) || donor;
                            // Convert lastDonation to YYYY-MM-DD format for the date input
                            const formatDateForInput = (dateStr: string) => {
                              if (!dateStr) return '';
                              const date = new Date(dateStr);
                              // Adjust for local timezone to avoid off-by-one day issues
                              const year = date.getFullYear();
                              const month = String(date.getMonth() + 1).padStart(2, '0');
                              const day = String(date.getDate()).padStart(2, '0');
                              return `${year}-${month}-${day}`;
                            };
                            setEditDonor({
                              name: found.name,
                              email: found.email,
                              phone: found.phone,
                              totalDonated: found.totalDonated,
                              lastDonation: formatDateForInput(found.lastDonation),
                              description: found.description || '',
                              status: found.status,
                            });
                            setShowEditDonor({ open: true, donor: found });
                          }}
                        >
                          Edit
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
                    <td colSpan={7} className={`px-6 py-12 text-center ${themeConfig.textSecondary}`}>
                      No donors found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`text-sm ${themeConfig.textSecondary} text-center`}>
          Showing {filteredDonors.length} of {donors.length} donors
        </div>

        {showAddDonor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`${themeConfig.surface} rounded-xl shadow-lg p-8 w-full max-w-md border ${themeConfig.border}`}>
              <h2 className={`text-2xl font-bold ${themeConfig.text} mb-6 text-center`}>Add New Donor</h2>
              <form onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await fetch('/api/donors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      ...newDonor,
                      totalDonated: newDonor.totalDonated === '' ? 0 : Number(newDonor.totalDonated)
                    }),
                  });
                  const result = await res.json();
                  if (!res.ok) {
                    toast.error(result.error || 'Failed to add donor');
                    return;
                  }
                  await fetchDonors();
                  setShowAddDonor(false);
                  setNewDonor({ name: '', email: '', phone: '', totalDonated: '', lastDonation: '', description: '', status: 'active' });
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
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Name</label>
                      <input placeholder="Name" value={newDonor.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, name: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Email</label>
                      <input placeholder="Email" value={newDonor.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, email: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Phone</label>
                      <input placeholder="Phone" value={newDonor.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, phone: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Total Donated</label>
                      <input placeholder="0" type="number" value={newDonor.totalDonated} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, totalDonated: e.target.value === '' ? '' : Number(e.target.value) })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Last Donation</label>
                      <input 
                        type="date" 
                        value={newDonor.lastDonation} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonor({ ...newDonor, lastDonation: e.target.value })} 
                        min={`${new Date().getFullYear()}-01-01`}
                        max={new Date().toISOString().split('T')[0]}
                        required 
                        className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`}
                      />
                      <p className={`text-xs ${themeConfig.textSecondary} mt-1`}>Must be within the current year and not in the future</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Description</label>
                      <textarea placeholder="Add notes about this donor..." value={newDonor.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDonor({ ...newDonor, description: e.target.value })} className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} rows={3} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Status</label>
                      <select value={newDonor.status} onChange={e => setNewDonor({ ...newDonor, status: e.target.value })} className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`}>
                        <option value="active">Active</option>
                        <option value="major">Major</option>
                        <option value="lapsed">Lapsed</option>
                      </select>
                    </div>
                <div className="flex gap-2 mt-6">
                  <button type="submit" className={`flex-1 ${themeConfig.primary} text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition`}>Add</button>
                  <button type="button" onClick={() => setShowAddDonor(false)} className={`flex-1 border ${themeConfig.border} py-2 px-4 rounded-lg ${themeConfig.surface} ${themeConfig.text} font-semibold hover:${themeConfig.accent} transition`}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showEditDonor.open && showEditDonor.donor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`${themeConfig.surface} rounded-xl shadow-lg p-8 w-full max-w-md border ${themeConfig.border}`}>
              <h2 className={`text-2xl font-bold ${themeConfig.text} mb-6 text-center`}>Edit Donor</h2>
              <form onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await fetch('/api/donors', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: showEditDonor.donor!.id,
                      ...editDonor,
                      totalDonated: editDonor.totalDonated === '' ? 0 : Number(editDonor.totalDonated)
                    }),
                  });
                  const result = await res.json();
                  if (!res.ok) {
                    toast.error(result.error || 'Failed to update donor');
                    return;
                  }
                  await fetchDonors();
                  setShowEditDonor({ open: false });
                  setEditDonor({ name: '', email: '', phone: '', totalDonated: '', lastDonation: '', description: '', status: 'active' });
                  toast.success('Donor updated successfully');
                } catch (err) {
                  // Try to show backend error message if available
                  if (err instanceof Response) {
                    const data = await err.json().catch(() => null);
                    toast.error(data?.error || 'Failed to update donor');
                  } else if (err instanceof Error) {
                    toast.error(err.message);
                  } else {
                    toast.error('Failed to update donor');
                  }
                }
              }} className="space-y-5">
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Name</label>
                      <input placeholder="Name" value={editDonor.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDonor({ ...editDonor, name: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Email</label>
                      <input placeholder="Email" value={editDonor.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDonor({ ...editDonor, email: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Phone</label>
                      <input placeholder="Phone" value={editDonor.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDonor({ ...editDonor, phone: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Total Donated</label>
                      <input placeholder="0" type="number" value={editDonor.totalDonated} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDonor({ ...editDonor, totalDonated: e.target.value === '' ? '' : Number(e.target.value) })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Last Donation</label>
                      <input 
                        type="date" 
                        value={editDonor.lastDonation} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDonor({ ...editDonor, lastDonation: e.target.value })} 
                        min={`${new Date().getFullYear()}-01-01`}
                        max={new Date().toISOString().split('T')[0]}
                        required 
                        className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`}
                      />
                      <p className={`text-xs ${themeConfig.textSecondary} mt-1`}>Must be within the current year and not in the future</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Description</label>
                      <textarea placeholder="Add notes about this donor..." value={editDonor.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDonor({ ...editDonor, description: e.target.value })} className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`} rows={3} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeConfig.text} mb-1`}>Status</label>
                      <select value={editDonor.status} onChange={e => setEditDonor({ ...editDonor, status: e.target.value as 'active' | 'lapsed' | 'major' })} className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${themeConfig.surface} ${themeConfig.text}`}>
                        <option value="active">Active</option>
                        <option value="major">Major</option>
                        <option value="lapsed">Lapsed</option>
                      </select>
                    </div>
                <div className="flex gap-2 mt-6">
                  <button type="submit" className={`flex-1 ${themeConfig.primary} text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition`}>Save Changes</button>
                  <button type="button" onClick={() => setShowEditDonor({ open: false })} className={`flex-1 border ${themeConfig.border} py-2 px-4 rounded-lg ${themeConfig.surface} ${themeConfig.text} font-semibold hover:${themeConfig.accent} transition`}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showAddCampaign && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`${themeConfig.surface} rounded-lg shadow-lg p-8 w-full max-w-md border ${themeConfig.border}`}>
              <h2 className={`text-xl font-bold mb-4 ${themeConfig.text}`}>Add Campaign</h2>
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
                <input placeholder="Goal" type="number" value={newCampaign.goal} onChange={e => setNewCampaign({ ...newCampaign, goal: Number(e.target.value) })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg ${themeConfig.surface} ${themeConfig.text}`} />
                <input placeholder="Raised" type="number" value={newCampaign.raised} onChange={e => setNewCampaign({ ...newCampaign, raised: Number(e.target.value) })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg ${themeConfig.surface} ${themeConfig.text}`} />
                <input placeholder="Start Date" type="date" value={newCampaign.startDate} onChange={e => setNewCampaign({ ...newCampaign, startDate: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg ${themeConfig.surface} ${themeConfig.text}`} />
                <input placeholder="End Date" type="date" value={newCampaign.endDate} onChange={e => setNewCampaign({ ...newCampaign, endDate: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg ${themeConfig.surface} ${themeConfig.text}`} />
                <input placeholder="Description" value={newCampaign.description} onChange={e => setNewCampaign({ ...newCampaign, description: e.target.value })} required className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg ${themeConfig.surface} ${themeConfig.text}`} />
                <select value={newCampaign.status} onChange={e => setNewCampaign({ ...newCampaign, status: e.target.value as 'active' | 'completed' | 'planned' | 'postponed' })} className={`w-full px-4 py-2 border ${themeConfig.border} rounded-lg ${themeConfig.surface} ${themeConfig.text}`}>
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="postponed">Postponed</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex gap-2">
                  <button type="submit" className={`flex-1 ${themeConfig.primary} text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition`}>Add</button>
                  <button type="button" onClick={() => setShowAddCampaign(false)} className={`flex-1 border ${themeConfig.border} py-2 px-4 rounded-lg ${themeConfig.surface} ${themeConfig.text} font-semibold hover:${themeConfig.accent} transition`}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const { themeConfig } = useTheme();

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        <main className="p-8">
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${themeConfig.text}`}>Donors</h1>
            <p className={`${themeConfig.textSecondary}`}>Manage your donor database</p>
          </div>
          {renderContent()}
        </main>

        <footer className={`border-t ${themeConfig.border} ${themeConfig.surface} py-6`}>
          <div className="px-8 text-center text-sm">
            <p className={`mb-1 ${themeConfig.textSecondary}`}>Bondary CRM © 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  const { themeConfig } = useTheme();
  
  return (
    <Suspense fallback={
      <div className={`min-h-screen ${themeConfig.bg} flex items-center justify-center`}>
        <div className={themeConfig.textSecondary}>Loading...</div>
      </div>
    }>
      <DonorListContent />
    </Suspense>
  );
}