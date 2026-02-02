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

## Tech Stack (For Developers)

| Category | Technology | What It Does |
|----------|------------|--------------|
| Framework | Next.js 16 (App Router) | The foundation that makes the website work |
| Language | TypeScript | JavaScript with extra safety checks |
| Database | Neon PostgreSQL + Prisma ORM | Stores all donor and campaign data in the cloud |
| Auth | NextAuth.js | Handles secure login (Google + email/password) |
| Styling | Tailwind CSS | Makes everything look nice |
| Charts | Recharts | Creates the visual graphs and charts |
| Icons | Lucide React | Provides all the icons you see |
| AI | OpenAI GPT-4o-mini | Powers the AI writing assistant and chat |
| Email | Nodemailer + Gmail | Sends emails directly to donors |
| Hosting | Vercel | Where the live website runs |

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
