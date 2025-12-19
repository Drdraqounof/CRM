# CRM Build & Database Error Log

## Summary
This file documents the major errors encountered while building the CRM app (Next.js + Prisma + Neon) and the solutions applied. It is intended to help future developers quickly resolve similar issues.

---

## 1. Prisma Connection & Neon Sync Errors
**Error:**
- Prisma could not connect to Neon Postgres.
- Tables missing after migration.
- Neon connection resets.

**Solution:**
- Verified `.env.local` for correct Neon connection string.
- Ran `prisma migrate dev` and `prisma db push` to sync schema.
- Used a global Prisma client (`lib/prisma.js`) for server-only access.
- Checked Neon dashboard for live schema.

---

## 2. Donor/Campaign Not Updating Database
**Error:**
- Adding a donor/campaign did not update Neon DB or frontend.

**Solution:**
- Patched API routes (`app/api/donors/route.js`, `app/api/campaigns/route.js`) for robust validation, error handling, and logging.
- Ensured POST requests create records in Neon and return errors clearly.
- Updated frontend to POST to API and refresh lists from DB after add.

---

## 3. Frontend Not Showing Backend Errors
**Error:**
- Frontend did not display backend error messages for donor/campaign add failures.

**Solution:**
- Updated frontend error handling to show backend error messages using toast notifications.
- Used `err instanceof Response` and parsed error JSON for display.

---

## 4. Campaigns Page Only Used Mock Data
**Error:**
- Campaigns page (`app/campaigns/page.tsx`) used local mock data, not Neon DB.
- New campaigns did not persist or show after reload.

**Solution:**
- Refactored campaigns page to fetch campaigns from `/api/campaigns` on load.
- POST new campaigns to API, then refresh from DB.
- Removed all local mock data/state.

---

## 5. Build Errors (Parsing ecmascript source code failed)
**Error:**
- Build failed with `Parsing ecmascript source code failed`, usually due to unclosed JSX tags or duplicate closing tags.

**Solution:**
- Fixed all JSX structure issues (properly closed `<ResponsiveContainer>` and `<BarChart>` tags).
- Removed duplicate closing tags and unmatched fragments.
- Verified with Next.js/Turbopack build output.

---

## 6. General Debugging Steps
- Always check error logs in both frontend and backend.
- Use detailed logging in API routes for debugging.
- Validate all input fields and handle unique constraint errors.
- Keep Prisma schema, migrations, and Neon DB in sync.
- Test all CRUD operations from the UI and confirm DB updates.

---

## Status
All major errors resolved. Campaigns and donors now sync with Neon DB, errors are surfaced in the frontend, and build issues are fixed.

---

*Last updated: December 18, 2025*
