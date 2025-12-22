# CRM Dashboard Wireframe

## Main Navigation
- Dashboard
- Donors
- Campaigns

---

## Dashboard Page
- **Header**: App title, navigation links
- **Stats Grid** (4 columns):
  - Total Donors
  - Active Donors
  - Major Donors
  - Lapsed Donors
- **All Campaigns Section**
  - List of all campaigns (name, goal, raised, status, dates, progress bar)
- **Top Donors Section**
  - List of top 5 donors by total giving (name, email, amount, overlay for donor description)
- **Footer**: App copyright

---

## Donor List Page
- **Donor Table**
  - Name, Email, Phone, Total Donated, Last Donation, Status
- **Add Donor Button**
- **Log Donation Button**
- **Filter/Search**
- **Donation Form Modal**
  - Donor selection, amount, date, method, campaign, recurring, notes

---

## Campaigns Page
- **Campaign Cards**
  - Name, Goal, Raised, Status, Dates, Description, Progress Bar
- **Add Campaign Button**

---

## Data Model (Simplified)
- Donor: id, name, email, phone, totalDonated, lastDonation, status, description
- Campaign: id, name, goal, raised, startDate, endDate, status, description

---

## Authentication & Onboarding
- **Authentication**: next-auth (Credentials & Google)
- **Onboarding Flow**: Post-login question for user type (personal/organization)
  - Conditional follow-up questions based on user type
  - Onboarding answers currently stored in localStorage (to be migrated to DB/session)
- **User Roles**: Planned for organization users (not yet implemented)

---

## Technical Stack & Data Flow
- **Framework**: Next.js App Router (16.x)
- **Database**: Prisma ORM + Neon (Postgres)
- **API**: REST endpoints in /app/api
- **Client/Server Split**: Server components for data fetching, client components for interactivity (e.g., dashboard overlay)
- **Charts**: recharts for dashboard stats
- **Live Data**: Dashboard and lists fetch live data from the database

---

## Notes
- Major donors are a subset of active donors
- Lapsed donors: last donation > 1 year ago
- Dashboard overlay shows donor description (clickable in Top Donors)
- Onboarding flow redirects new users after login/registration
- All data is now live from the database (no longer seeded from mock-data files)
- Build errors fixed: "use client" directive only in client components
