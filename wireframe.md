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
  - List of top 5 donors by total giving (name, email, amount)
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
- Donor: id, name, email, phone, totalDonated, lastDonation, status
- Campaign: id, name, goal, raised, startDate, endDate, status, description

---

## Notes
- Major donors are a subset of active donors
- Lapsed donors: last donation > 1 year ago
- All data is seeded from mock-data files
- Dashboard stats and lists are live from the database
