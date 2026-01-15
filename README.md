# DonorConnect CRM

A modern donor relationship management platform for nonprofits and fundraising organizations, built with Next.js, TypeScript, and Prisma. This project was created as part of a school assignment to demonstrate full-stack development skills with AI integration.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.22-teal)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991)

## 🎯 Project Overview

DonorConnect solves a real problem: **non-profit organizations struggle to manage donor relationships effectively**. Many organizations rely on scattered spreadsheets, generic mass emails, and manual tracking—leading to poor donor retention and missed fundraising opportunities.

**Our Solution:** A centralized CRM platform with AI-powered communication tools that help fundraising teams build stronger, more personalized donor relationships.

## ✨ Features

- **📊 Interactive Dashboard** - Real-time overview of fundraising progress, top donors, and campaign metrics
- **👥 Donor Management** - Track donors, donations, and engagement history with a PostgreSQL database
- **📈 Campaign Tracking** - Create and monitor fundraising campaigns with visual progress charts
- **✍️ AI Writing Assistant** - Generate personalized donor emails (thank-you, appeals, follow-ups) using OpenAI GPT-4o-mini
- **📧 Email Integration** - Send AI-generated emails directly via Gmail SMTP
- **🤖 AI Chat Assistant** - Built-in AI helper for quick insights and questions
- **🔐 Secure Authentication** - Google OAuth and email/password login via NextAuth.js
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

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
GMAIL_USER="your-gmail-address"
GMAIL_APP_PASSWORD="your-gmail-app-password"
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
├── api/            # API routes (auth, donors, campaigns, chat, ai-writer, send-email)
├── dashboard/      # Main dashboard page
├── donor-list/     # Donor management
├── campaigns/      # Campaign tracking
├── ai-writer/      # AI Writing Assistant for donor communications
├── login/          # Authentication
├── features/       # Features showcase
├── build/          # Why DonorConnect + AI Policy
├── about/          # About page with reflection
└── ui/             # Reusable UI components
lib/
├── prisma.ts       # Database client
└── auth.ts         # Auth utilities
prisma/
├── schema.prisma   # Database schema
└── seed.js         # Seed data
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | Neon PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Google OAuth + Credentials) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| AI | OpenAI GPT-4o-mini |
| Email | Nodemailer + Gmail SMTP |
| Deployment | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features overview |
| `/login` | Sign in with Google or email/password |
| `/dashboard` | Main dashboard with metrics and charts |
| `/donor-list` | View and manage donors |
| `/campaigns` | Track fundraising campaigns |
| `/ai-writer` | AI Writing Assistant for donor emails |
| `/features` | Platform features showcase |
| `/build` | Why DonorConnect + AI Policy |
| `/about` | About page with project reflection |

## API Routes

- `POST /api/auth/[...nextauth]` - Authentication endpoints
- `GET/POST /api/donors` - Donor CRUD operations
- `GET/POST /api/campaigns` - Campaign CRUD operations
- `POST /api/chat` - AI chat assistant
- `POST /api/ai-writer` - AI email content generation
- `POST /api/send-email` - Send emails via Gmail SMTP

## 📚 Documentation

- [REFLECTION.md](./REFLECTION.md) - Project reflection, challenges, and learnings
- [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md) - Common issues and solutions

## Troubleshooting

See [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md) for common issues and solutions.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project was created for educational purposes as part of a school assignment.

---

Built with ❤️ using Next.js and GitHub Copilot
