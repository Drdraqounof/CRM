# Project Reflection: DonorConnect CRM

## Overview

DonorConnect is a donor relationship management platform I built to help non-profit organizations manage their fundraising efforts more effectively. This document reflects on the development process, the challenges I faced, what I learned, and how AI tools helped me throughout the project.

---

## 🎯 What I Set Out to Build

I wanted to create a real, functional CRM that solves an actual problem: **non-profits struggle to maintain personal connections with donors** when using scattered spreadsheets and generic communication tools. My goal was to build a platform that:

1. Centralizes donor data in a real database
2. Tracks fundraising campaigns with visual progress
3. Uses AI to help write personalized donor communications
4. Provides a modern, professional user interface

---

## 🚧 Biggest Challenges

### 1. Database Connection & Synchronization (Prisma + Neon)

**The Problem:** Getting Prisma ORM to connect reliably to Neon's serverless PostgreSQL was one of the biggest hurdles. Tables would sometimes be missing after migrations, connections would reset unexpectedly, and data wouldn't persist.

**What I Learned:** 
- Environment variables need to be configured correctly (`.env.local` vs `.env`)
- Using a global Prisma client prevents connection pool exhaustion in serverless environments
- Always verify the database schema in the Neon dashboard after running migrations
- `prisma migrate dev` and `prisma db push` serve different purposes

### 2. Server vs Client Components in Next.js App Router

**The Problem:** Next.js 16 uses the App Router, which strictly separates Server Components and Client Components. I kept getting errors like:
- `'use client' cannot be used with async functions`
- `ssr: false is not allowed in Server Components`
- Dynamic imports failing silently

**What I Learned:**
- Data fetching (Prisma queries) must happen in Server Components
- Interactive UI (state, effects, event handlers) must be in Client Components
- I created wrapper components (like `DashboardPageClientWrapper.tsx`) to bridge the gap
- This separation actually makes the code more organized once you understand it

### 3. Frontend Not Displaying Backend Errors

**The Problem:** When a donor or campaign failed to save, the frontend would fail silently. Users had no idea what went wrong.

**What I Learned:**
- Always return meaningful error messages from API routes
- Parse error responses properly on the frontend (`await response.json()`)
- Use toast notifications to surface errors to users immediately
- Logging in both frontend and backend is essential for debugging

### 4. Chart Rendering Issues

**The Problem:** Charts would render as blank space when switching chart types, or fail to display data at all.

**What I Learned:**
- Different chart types (bar, pie, stacked) require different data formats
- The Recharts library needs specific props for each chart type
- Always check the browser console for rendering errors
- Verify data is actually being passed to the chart component

### 5. Email Integration

**The Problem:** I originally tried using Resend for email but ran into API key issues. Switching to Gmail required understanding SMTP configuration and app passwords.

**What I Learned:**
- Gmail requires an "App Password" when 2FA is enabled (not your regular password)
- Nodemailer is straightforward once configured correctly
- Environment variables for sensitive credentials must never be committed to git

---

## 💡 What I Would Do Differently

### With More Time

1. **Add Donation Tracking:** I would add a dedicated donations page where users can log individual donations and link them to donors and campaigns.

2. **Implement Email Templates:** Save frequently used email templates so users don't have to regenerate similar content.

3. **Add Search and Filtering:** The donor list would benefit from search functionality and filters (by status, donation amount, date range).

4. **Better Error Handling:** More comprehensive error boundaries and user-friendly error pages.

5. **Testing:** I would add unit tests for API routes and integration tests for critical user flows.

### Starting Over

If I were to start this project from scratch, I would:

1. **Plan the database schema first** - I had to run multiple migrations as I discovered new fields I needed
2. **Set up error handling patterns early** - This would have saved hours of debugging
3. **Create a component library upfront** - Consistent button styles, cards, and form inputs from day one
4. **Document API contracts** - Clear documentation of what each endpoint expects and returns

---

## 🤖 How AI Helped Me

### GitHub Copilot

GitHub Copilot was invaluable throughout development:

- **Code Generation:** Copilot generated entire React components from natural language descriptions. I'd describe what I wanted ("create a card component with a gradient header") and it would produce working code.

- **Bug Fixing:** When I had JSX syntax errors or TypeScript mismatches, describing the error to Copilot often led to immediate fixes.

- **API Routes:** Copilot helped me write Prisma queries and structure API responses correctly.

- **CSS/Styling:** Tailwind CSS class combinations were suggested automatically, speeding up UI development significantly.

### OpenAI GPT-4o-mini (In the Product)

The AI Writing Assistant uses OpenAI's API to generate donor communications:

- **Prompt Engineering:** I learned how to craft prompts that produce appropriate, professional content
- **Context Matters:** Including donor name, campaign context, and communication type in the prompt dramatically improves output quality
- **Human Review:** AI-generated content always needs human review before sending—it's a tool, not a replacement

---

## 📊 Key Learnings

1. **Modern full-stack development is complex** - Managing a frontend framework, database ORM, authentication, and external APIs requires understanding how many pieces fit together.

2. **Error messages are your friends** - Reading error messages carefully (instead of panicking) usually points directly to the solution.

3. **Serverless has tradeoffs** - Neon and Vercel are great for deployment, but require understanding connection pooling and cold starts.

4. **AI accelerates, but doesn't replace, understanding** - Copilot made me faster, but I still needed to understand the code to debug issues and make architectural decisions.

5. **User experience matters** - Loading states, error messages, and intuitive UI aren't optional—they're essential.

---

## 🏁 Final Thoughts

Building DonorConnect taught me more than any tutorial could. The real learning happened when things broke—when migrations failed, when components wouldn't render, when data wouldn't save. Each error forced me to understand the underlying systems more deeply.

I'm proud of what I built: a functional, deployed application that solves a real problem using modern technologies. The AI integration is genuinely useful, the database is real, and the UI is professional. Most importantly, I understand how all the pieces work together.

---

*Project completed: January 2026*
*Built with Next.js 16, TypeScript, Prisma, Neon PostgreSQL, OpenAI, and GitHub Copilot*
