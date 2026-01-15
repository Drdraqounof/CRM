# Bondary CRM

A modern Customer Relationship Management platform for nonprofits and organizations, built with Next.js, TypeScript, and Prisma.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.22-teal)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## Features

- **📊 Interactive Dashboard** - Real-time overview of fundraising progress, top donors, and campaign metrics
- **👥 Donor Management** - Track donors, donations, and engagement history
- **📈 Campaign Tracking** - Create and monitor fundraising campaigns with visual progress charts
- **🤖 AI Chat Assistant** - Built-in AI helper powered by OpenAI for quick insights
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

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Google OAuth + Credentials) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| AI | OpenAI GPT-4o-mini |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features overview |
| `/login` | Sign in with Google or email/password |
| `/dashboard` | Main dashboard with metrics and charts |
| `/donor-list` | View and manage donors |
| `/campaigns` | Track fundraising campaigns |
| `/features` | Platform features showcase |
| `/build` | How this CRM was built |
| `/about` | About Bondary CRM |

## API Routes

- `POST /api/auth/[...nextauth]` - Authentication endpoints
- `GET/POST /api/donors` - Donor CRUD operations
- `GET/POST /api/campaigns` - Campaign CRUD operations
- `POST /api/chat` - AI chat assistant

## Troubleshooting

See [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md) for common issues and solutions.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for learning and prototyping purposes.

---

Built with ❤️ using Next.js and GitHub Copilot
