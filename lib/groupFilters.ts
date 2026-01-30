// Group filtering logic - centralized for both pages and API

interface Donor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalDonated?: number;
  status?: string;
  createdAt: string;
  lastDonation?: string;
  description?: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  criteria: string[];
  donorCount: number;
  color: string;
  createdAt: string;
}

/**
 * Apply group filtering based on group ID or criteria
 * For built-in groups (1-5), uses predefined logic
 * For custom groups (>5), uses criteria-based filtering
 */
export const filterDonorsByGroup = (donors: Donor[], group: Group): Donor[] => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Built-in group filters
  switch (group.id) {
    case 1: // Major Donors
      return donors.filter((d) => (d.totalDonated || 0) >= 10000);

    case 2: // Active Monthly Givers
      return donors.filter((d) => {
        const lastDonation = d.lastDonation ? new Date(d.lastDonation) : null;
        return lastDonation && lastDonation >= thirtyDaysAgo && d.status === "active";
      });

    case 3: // Lapsed Donors
      return donors.filter((d) => {
        const lastDonation = d.lastDonation ? new Date(d.lastDonation) : null;
        return lastDonation && lastDonation < sixMonthsAgo && d.status === "lapsed";
      });

    case 4: // First-Time Donors
      return donors.filter((d) => {
        const createdAt = d.createdAt ? new Date(d.createdAt) : null;
        return createdAt && createdAt >= startOfYear;
      });

    case 5: // Event Attendees
      return donors.filter((d) =>
        d.description?.toLowerCase().includes("event") ||
        d.description?.toLowerCase().includes("gala") ||
        d.description?.toLowerCase().includes("attendee") ||
        false
      );

    // Custom groups - use criteria-based filtering
    default:
      if (group.criteria && group.criteria.length > 0) {
        return donors.filter((donor) => {
          // Check if donor matches ANY criteria (OR logic)
          return group.criteria.some((criterion) => {
            const lower = criterion.toLowerCase().trim();

            // Total donated filters - multiple formats
            // Matches: "10000", "$10,000", "total >= 10000", ">= $10,000", etc.
            if (lower.match(/\$?[\d,]+/) && (lower.includes("total") || lower.includes(">=") || lower.match(/^\$?[\d,]+$/))) {
              const match = criterion.match(/\$?([\d,]+)/);
              if (match) {
                const amount = parseInt(match[1].replace(/,/g, ""));
                return (donor.totalDonated || 0) >= amount;
              }
            }

            // Status filters
            if (lower.includes("active")) {
              return donor.status === "active";
            }
            if (lower.includes("lapsed")) {
              return donor.status === "lapsed";
            }
            if (lower.includes("major")) {
              return donor.status === "major";
            }

            // Description/notes filters
            if (lower.includes("event") || lower.includes("gala")) {
              return donor.description?.toLowerCase().includes("event") ||
                     donor.description?.toLowerCase().includes("gala");
            }

            // Donation date filters
            if (lower.includes("30 days") || lower.includes("last month")) {
              const lastDonation = donor.lastDonation ? new Date(donor.lastDonation) : null;
              return lastDonation && lastDonation >= thirtyDaysAgo;
            }

            if (lower.includes("6 months") || lower.includes("last 6 months")) {
              const lastDonation = donor.lastDonation ? new Date(donor.lastDonation) : null;
              return lastDonation && lastDonation >= sixMonthsAgo;
            }

            // Default: check if criterion appears in description
            return donor.description?.toLowerCase().includes(lower) || false;
          });
        });
      }
      return donors;
  }
};

/**
 * Get built-in groups
 */
export const getBuiltInGroups = (): Group[] => [
  {
    id: 1,
    name: "Major Donors",
    description: "Donors who have contributed $10,000 or more",
    criteria: ["Total donations >= $10,000"],
    donorCount: 0,
    color: "bg-purple-500",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Active Monthly Givers",
    description: "Donors with active status who donated in last 30 days",
    criteria: ["Active status", "Donated in last 30 days"],
    donorCount: 0,
    color: "bg-green-500",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    name: "Lapsed Donors",
    description: "Donors who haven't donated in 6+ months",
    criteria: ["Last donation > 6 months ago", "Lapsed status"],
    donorCount: 0,
    color: "bg-red-500",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    name: "First-Time Donors",
    description: "Donors added this year",
    criteria: ["Created in current year"],
    donorCount: 0,
    color: "bg-blue-500",
    createdAt: "2024-01-01",
  },
  {
    id: 5,
    name: "Event Attendees",
    description: "Donors who have attended fundraising events",
    criteria: ["Event/Gala mentioned in notes"],
    donorCount: 0,
    color: "bg-pink-500",
    createdAt: "2024-04-05",
  },
];
