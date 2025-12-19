// CommonJS export for Prisma seed
exports.mockDonors = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '555-0101', totalDonated: 15000, lastDonation: '11/14/2024', status: 'major' },
  { id: '2', name: 'Jennifer Williams', email: 'jwilliams@email.com', phone: '555-0102', totalDonated: 12000, lastDonation: '11/29/2024', status: 'major' },
  { id: '3', name: 'Michael Chen', email: 'mchen@email.com', phone: '555-0103', totalDonated: 8500, lastDonation: '10/19/2024', status: 'active' },
  { id: '4', name: 'David Thompson', email: 'dthompson@email.com', phone: '555-0104', totalDonated: 5000, lastDonation: '9/15/2024', status: 'active' },
  { id: '5', name: 'Robert Martinez', email: 'rmartinez@email.com', phone: '555-0105', totalDonated: 3500, lastDonation: '8/20/2024', status: 'active' },
  { id: '6', name: 'Emily Rodriguez', email: 'erodriguez@email.com', phone: '555-0106', totalDonated: 250, lastDonation: '11/30/2024', status: 'active' },
  { id: '7', name: 'James Wilson', email: 'jwilson@email.com', phone: '555-0107', totalDonated: 2200, lastDonation: '3/10/2024', status: 'lapsed' },
  { id: '8', name: 'Lisa Anderson', email: 'landerson@email.com', phone: '555-0108', totalDonated: 6800, lastDonation: '10/5/2024', status: 'active' },
];

exports.mockCampaigns = [
  {
    id: 'a',
    name: 'Annual Fundraiser',
    goal: 10000,
    raised: 5000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    description: 'Our annual fundraising campaign.'
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
