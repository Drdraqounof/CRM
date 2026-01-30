// Simple mock data for donors and campaigns
export const mockDonors = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '555-0101', totalDonated: 15000, lastDonation: '2025-12-25', createdAt: '2024-01-15', status: 'major', description: 'Met at 2023 Gala. Enjoys art events. Works at Acme Corp. Prefers phone calls.' },
  { id: '2', name: 'Jennifer Williams', email: 'jwilliams@email.com', phone: '555-0102', totalDonated: 12000, lastDonation: '2025-12-25', createdAt: '2024-02-20', status: 'major', description: 'Referred by board member. Active on social media. Attends annual luncheons.' },
  { id: '3', name: 'Michael Chen', email: 'mchen@email.com', phone: '555-0103', totalDonated: 8500, lastDonation: '2025-12-25', createdAt: '2026-01-10', status: 'active', description: 'Joined via online campaign. Tech industry. Likes impact reports.' },
  { id: '4', name: 'David Thompson', email: 'dthompson@email.com', phone: '555-0104', totalDonated: 5000, lastDonation: '2025-12-25', createdAt: '2024-03-05', status: 'active', description: 'Met at networking event. Enjoys volunteering. Prefers email.' },
  { id: '5', name: 'Robert Martinez', email: 'rmartinez@email.com', phone: '555-0105', totalDonated: 3500, lastDonation: '2025-12-25', createdAt: '2025-06-15', status: 'active', description: 'Corporate donor. Brings colleagues to events. Interested in matching gifts.' },
  { id: '6', name: 'Emily Rodriguez', email: 'erodriguez@email.com', phone: '555-0106', totalDonated: 250, lastDonation: '2025-12-25', createdAt: '2026-01-20', status: 'active', description: 'Student donor. Found us via Instagram. Prefers text updates.' },
  { id: '7', name: 'James Wilson', email: 'jwilson@email.com', phone: '555-0107', totalDonated: 2200, lastDonation: '2024-12-19', createdAt: '2023-08-10', status: 'lapsed', description: 'Past event attendee. Needs re-engagement. Enjoys sports.' },
  { id: '8', name: 'Lisa Anderson', email: 'landerson@email.com', phone: '555-0108', totalDonated: 6800, lastDonation: '2025-12-25', createdAt: '2024-05-22', status: 'active', description: 'Joined through company drive. Likes newsletters. Prefers in-person meetings.' },
];

export const mockCampaigns = [
  {
    id: 'a',
    name: 'Annual Fundraiser',
    goal: 10000,
    raised: 5000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    description: `Our annual fundraising campaign.\n\nConnection: Social Event\nEngagement: Met at the 2024 Gala, enjoys networking and is active on LinkedIn.\nAffiliation: Member of the "Friends of the Foundation" corporate group.\nNotes: Prefers email communication, interested in matching gifts, and often brings colleagues to events.`
  },
  {
    id: 'b',
    name: 'Holiday Drive',
    goal: 20000,
    raised: 12000,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    status: 'planned',
    description: 'Special holiday giving campaign.'
  },
  {
    id: 'c',
    name: 'Matching Gifts',
    goal: 15000,
    raised: 15000,
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'completed',
    description: 'Matching gifts from corporate partners.'
  },
];
