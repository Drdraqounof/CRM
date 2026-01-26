
# Build Framework

This document provides a comprehensive overview of the build, development, and deployment framework for the CRM project.

---

## 1. Project Structure

- **app/**: Contains all Next.js pages, API routes, and UI components. Follows the App Router paradigm for modularity and scalability.
	- **api/**: Serverless API endpoints (e.g., authentication, survey, chat, etc.).
	- **components/**: Reusable UI components (e.g., Sidebar, ChatWidget).
	- **ui/**: Design system primitives (Button, Card, Input, etc.).
- **lib/**: Shared libraries and utilities, such as:
	- **prisma.ts/js**: Prisma client instance for database access.
	- **auth.ts**: Authentication helpers.
- **prisma/**: Database schema (`schema.prisma`), migration files, and seed scripts.
- **public/**: Static assets (images, fonts, stylesheets).
- **config files**: ESLint, PostCSS, TypeScript, Next.js config, etc.

---

## 2. Environment Setup

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- PostgreSQL (local or cloud, e.g., Neon, Supabase)

### Initial Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in environment variables (database URL, secrets, etc.).
4. Run `npx prisma generate` to generate the Prisma client.
5. Run `npx prisma migrate dev` to apply migrations and set up the database.

---

## 3. Build Tools & Scripts

- **Next.js**: Handles SSR, static site generation, routing, and API endpoints.
- **TypeScript**: Type safety and autocompletion.
- **ESLint**: Linting for code quality (`npm run lint`).
- **Prettier**: Code formatting (optional, can be integrated with ESLint).
- **PostCSS**: CSS processing pipeline.
- **Prisma**: Database ORM and migration tool.

### Common Scripts (see `package.json`)
- `dev`: Start development server (`next dev`).
- `build`: Build for production (`next build`).
- `start`: Start production server (`next start`).
- `lint`: Run ESLint.
- `prisma:migrate`: Run Prisma migrations.
- `prisma:studio`: Open Prisma Studio for DB management.

---

## 4. Deployment

- **Recommended**: Deploy on Vercel for seamless Next.js support.
- **Alternative**: Deploy on any Node.js-compatible host (e.g., AWS, DigitalOcean, Heroku).
- **Static Assets**: Served from the `public/` directory.
- **Environment Variables**: Set securely in your deployment platform (never commit secrets).
- **Database**: Use managed PostgreSQL (Neon, Supabase, etc.) for production.

---

## 5. Database & Migrations

- **Prisma ORM**: Central schema in `prisma/schema.prisma`.
- **Migrations**: Tracked in `prisma/migrations/`.
- **Seeding**: Use `prisma/seed.js` for initial data population.
- **Development**:
	- `npx prisma migrate dev` — apply latest migrations.
	- `npx prisma studio` — visual DB editor.
- **Production**:
	- `npx prisma migrate deploy` — run migrations in CI/CD or on deploy.

---

## 6. CI/CD Pipeline (Recommended)

- **GitHub Actions** or **Vercel** for automated testing, build, and deployment.
- **Typical Workflow**:
	1. On push/PR, run lint, type-check, and tests.
	2. Build the app.
	3. Deploy to preview or production environment.
- **Sample GitHub Actions Steps**:
	- Checkout code
	- Set up Node.js
	- Install dependencies
	- Lint and type-check
	- Run tests (if present)
	- Build
	- Deploy (Vercel CLI or other)

---

## 7. Troubleshooting & Best Practices

- **Common Issues**:
	- Missing environment variables: Check `.env` and deployment settings.
	- Database connection errors: Verify DB URL and credentials.
	- Build failures: Run `npm run lint` and check TypeScript errors.
- **Best Practices**:
	- Use feature branches and PRs for new work.
	- Keep dependencies up to date.
	- Regularly review and update environment variables and secrets.
	- Document new scripts, tools, or workflows in this file.

---

## 8. Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [ESLint](https://eslint.org/docs/latest/)
- [PostCSS](https://postcss.org/)

---

_Keep this document updated as your project evolves!_
