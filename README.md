# DonorConnect (Bondary CRM)

## What Is This?

**DonorConnect is a web app that helps nonprofits keep track of their donors and fundraising campaigns.** 

Think of it like a digital address book combined with a fundraising tracker. Instead of using messy spreadsheets or sticky notes to remember who donated, how much they gave, and when to follow up—this app does it all in one place.

### The Problem We're Solving

Nonprofits often struggle with:
- **Scattered information** - Donor details spread across emails, spreadsheets, and paper files
- **Generic communication** - Sending the same boring "thank you" to everyone instead of personal messages
- **No visibility** - Not knowing which campaigns are working or which donors might stop giving
- **Wasted time** - Hours spent manually tracking donations instead of building relationships

### Our Solution

DonorConnect gives you:
- A **central database** for all your donors and their giving history
- An **AI Writing Assistant** that helps write personalized thank-you letters and fundraising appeals
- **Visual dashboards** showing how your campaigns are performing
- **Email integration** to send messages directly from the app

---

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.22-teal)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## Features

- **📊 Interactive Dashboard** - See your fundraising progress, top donors, and campaign stats at a glance
- **👥 Donor Management** - Store donor info, track donations, and see engagement history
- **📈 Campaign Tracking** - Create fundraising campaigns and watch progress with visual charts
- **✍️ AI Writing Assistant** - Use AI to write personalized donor emails (thank-you notes, appeals, follow-ups)
- **📧 Email Integration** - Send emails directly to donors without leaving the app
- **🤖 AI Chat Helper** - Ask questions and get quick insights powered by OpenAI
- **🔐 Secure Login** - Sign in with Google or email/password
- **📱 Mobile Friendly** - Works on phones, tablets, and computers

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) for serverless)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crm.git
cd crm
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following in `.env.local`:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OPENAI_API_KEY="your-openai-api-key"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── api/            # API routes (auth, donors, campaigns, chat)
├── dashboard/      # Main dashboard page
├── donor-list/     # Donor management
├── campaigns/      # Campaign tracking
├── login/          # Authentication
├── features/       # Features showcase
├── build/          # Build process documentation
├── about/          # About page
└── ui/             # Reusable UI components
lib/
├── prisma.ts       # Database client
└── auth.ts         # Auth utilities
prisma/
├── schema.prisma   # Database schema
└── seed.js         # Seed data
```

## System Architecture

### Front-End

The user-facing layer that delivers the web application to browsers and mobile devices.

**Technologies & Framework:**
- **Next.js 16** (App Router) - Modern React framework with server-side rendering and static generation
- **TypeScript** - Adds type safety to JavaScript for fewer bugs and better developer experience
- **React** - Component-based UI library for building interactive interfaces
- **Tailwind CSS** - Utility-first CSS framework for responsive and consistent styling
- **Recharts** - Charting library for interactive graphs and data visualization
- **Lucide React** - Icon library for consistent, scalable UI icons

**Key Features:**
- Responsive design that works on desktop, tablet, and mobile
- Server-side rendering for better performance and SEO
- Reusable UI components (buttons, cards, inputs, selects, textareas)
- Real-time interactive dashboards with charts and statistics
- Theme support (light/dark mode) with persistent storage

**Features Served:**
- Dashboard with campaign and donor analytics
- Donor list management with search and filtering
- Campaign creation and tracking
- AI Writing Assistant for email composition
- Live chat interface powered by AI
- User profile and settings pages

---

### Back-End (Web Server Services)

The server-side application logic that handles requests, authentication, business logic, and third-party integrations.

**Core Technologies:**
- **Next.js API Routes** - Built-in serverless functions that serve as REST API endpoints
- **TypeScript** - Type-safe server code for reliability
- **Node.js Runtime** - JavaScript runtime executing the server logic

**Authentication & Security:**
- **NextAuth.js** - Handles user authentication and session management
- **OAuth Integration** - Google OAuth for seamless social login
- **Email/Password Auth** - Traditional login method with secure credential handling
- **JWT Tokens** - Secure token-based authentication for API requests
- **CORS & Security Headers** - Protects against common web vulnerabilities

**API Endpoints & Services:**
- `/api/auth/[...nextauth]` - Authentication provider and session management
- `/api/donors` - CRUD operations for donor data management
- `/api/campaigns` - Campaign creation, updates, and analytics
- `/api/chat` - Real-time AI chat interface connected to OpenAI
- `/api/ai-writer` - AI-powered email and content generation
- `/api/questions` - Question management for surveys and forms
- `/api/send-email` - Email sending service via Gmail SMTP
- `/api/survey` - Survey creation and submission handling
- `/api/contact` - Contact form processing

**Third-Party Integrations:**
- **OpenAI API** - Powers AI writing assistant and chat features using GPT-4o-mini
- **Gmail SMTP** - Email delivery service for sending donor communications
- **Google OAuth** - Social authentication provider

**Middleware & Utilities:**
- Authentication guards on protected endpoints
- Request validation and error handling
- Rate limiting for API endpoints
- Error logging and monitoring

---

### Back-End (Databases)

The persistent data layer that stores all application data with structured schema and relationships.

**Database Solution:**
- **Neon PostgreSQL** - Serverless PostgreSQL database with auto-scaling and branching capabilities
- **Cloud Hosting** - Managed database in the cloud for reliability, backups, and security

**Database Management:**
- **Prisma ORM** - Modern database toolkit that provides:
  - Type-safe database queries with auto-completion
  - Automatic migrations for schema changes
  - Query builder API (no raw SQL needed)
  - Database seeding for test data
  - Real-time data subscriptions

**Core Data Models:**
- **Users** - Application user accounts with authentication credentials
- **Donors** - Donor profiles with contact information, giving history, and metadata
- **Campaigns** - Fundraising campaigns with tracking and performance metrics
- **Donations** - Individual donation records linked to donors and campaigns
- **Groups** - Organizational groupings of donors for segmentation
- **Interactions** - Communication history with donors (emails, calls, messages)

**Database Features:**
- Relational data with foreign key constraints
- Automatic timestamps for created_at and updated_at tracking
- Data migrations for schema evolution over time
- Seed scripts for populating initial test data
- Backup and recovery options through Neon console

---

## Tech Stack Summary

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend Framework** | Next.js 16 | React-based full-stack framework |
| **Language** | TypeScript | Type-safe JavaScript |
| **UI Library** | React | Component-based UI framework |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Database** | Neon PostgreSQL | Serverless relational database |
| **ORM** | Prisma | Database access and migrations |
| **Authentication** | NextAuth.js | User login and session management |
| **AI Integration** | OpenAI API | Writing assistant and chat |
| **Email Service** | Gmail SMTP | Email sending |
| **Charting** | Recharts | Data visualization |
| **Hosting** | Vercel | Deployment and serverless functions |

## Pages (What You Can Do)

| Page | What It's For |
|------|---------------|
| `/` | Home page - explains what DonorConnect is |
| `/login` | Sign in with Google or email/password |
| `/dashboard` | Your main control center with stats and charts |
| `/donor-list` | View, add, and manage all your donors |
| `/campaigns` | Create and track fundraising campaigns |
| `/ai-writer` | Use AI to write donor emails |
| `/features` | See all the features DonorConnect offers |
| `/build` | Learn how this app was built (for nerds 🤓) |
| `/about` | About the team and project |

## API Routes (Technical Endpoints)

These are the behind-the-scenes connections that make the app work:

- `POST /api/auth/[...nextauth]` - Handles login/logout
- `GET/POST /api/donors` - Get or add donor information
- `GET/POST /api/campaigns` - Get or add campaign information
- `POST /api/chat` - Send messages to the AI chat assistant
- `POST /api/ai-writer` - Generate AI-written email content
- `POST /api/send-email` - Send emails via Gmail

## Troubleshooting

Having issues? Check [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md) for common problems and fixes.

## About This Project


## AI Ethics & Responsible Use

DonorConnect uses AI to help nonprofits communicate more effectively with donors. We are committed to responsible and ethical use of AI technologies. Here are our guiding principles:

- **Transparency:** Users are informed when AI is used to generate content or insights.
- **Privacy:** Donor data is never used to train AI models. All personal information is handled securely and only used for its intended purpose.
- **Fairness:** AI-generated messages are designed to be inclusive and avoid bias or discrimination.
- **Human Oversight:** AI suggestions are always reviewed and approved by a human before being sent to donors.
- **Accountability:** We monitor AI outputs for quality and accuracy, and provide clear ways to report issues or concerns.

If you have questions or concerns about AI use in DonorConnect, please contact the project maintainers.

---

This project was built as a school project to demonstrate full-stack web development with AI integration. It uses real technologies that professional developers use every day.

**Built with ❤️ using Next.js and GitHub Copilot**
