// Campaign type for campaign management
export type Campaign = {
  id: string;
  name: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'active' | 'completed';
  description: string;
};
