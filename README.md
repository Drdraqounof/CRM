This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# CRM Project Prototype

## Libraries & Tools Used

This project uses several open-source libraries and tools to provide a modern, full-featured CRM experience:

- **Recharts** ([recharts.org](https://recharts.org/))
	- Used for data visualization in the Campaigns dashboard ([app/campaigns/page.tsx](app/campaigns/page.tsx)).
	- Provides interactive bar, pie, and stacked charts to visualize fundraising progress and campaign data.

- **Prisma ORM** ([prisma.io](https://www.prisma.io/))
	- Used for type-safe database access and migrations.
	- Schema defined in [prisma/schema.prisma](prisma/schema.prisma).
	- Data models for users, donors, and campaigns.

- **NextAuth.js** ([next-auth.js.org](https://next-auth.js.org/))
	- Handles authentication (Google OAuth and credentials login).
	- Configured in [app/api/auth/[...nextauth]/route.ts](app/api/auth/[...nextauth]/route.ts).

- **Tailwind CSS** ([tailwindcss.com](https://tailwindcss.com/))
	- Utility-first CSS framework for rapid UI development.
	- See [app/globals.css](app/globals.css) and component classNames.

- **Lucide React** ([lucide.dev](https://lucide.dev/))
	- Icon library for modern, consistent UI icons.
	- Used throughout the UI (e.g., dashboard, campaign actions).

- **bcryptjs**
	- Used for password hashing in authentication logic.

- **Framer Motion & GSAP**
	- Used for UI animations and transitions.

For a full list of dependencies, see [package.json](package.json).

This is a prototype for a Customer Relationship Management (CRM) web application, built with Next.js, TypeScript, and Prisma. It demonstrates core CRM features such as donor management, campaign tracking, authentication, and data visualization. The project is intended for learning, prototyping, and as a foundation for a full-featured CRM.

## What is this project?
This project is a working demo of a CRM system for nonprofits or organizations that manage donors and fundraising campaigns. It allows you to:
- Track donors and their donations
- Manage fundraising campaigns
- Log in securely
- View dashboards and reports
- Add, edit, and view details for donors and campaigns

## Pages Explained (Layman Terms)

- **/login**: The login page. Lets users sign in with Google or credentials to access the CRM.
- **/dashboard**: The main dashboard. Shows an overview of fundraising, top donors, and active campaigns in a visual, easy-to-read format.
- **/donor-list**: The donor management page. Lets you view, search, filter, and manage all donors. You can add new donors, see their details, and view their descriptions in an overlay.
- **/campaigns**: The campaign management page. Lets you view, add, and manage fundraising campaigns, including their goals, progress, and status.
- **/post-login-question/personal**: A page for collecting additional personal information from users after login (e.g., onboarding step).
- **/post-login-question/organization**: A page for collecting organization details after login (e.g., onboarding step).
- **/about**: A simple about page describing the project or organization.
- **/wireframe**: A page for wireframes and design documentation.

## Technical Notes
- **Framework**: Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS for rapid UI development.
- **Database**: Uses Prisma ORM with a PostgreSQL backend (Neon or local). All data models are defined in `prisma/schema.prisma`.
- **Authentication**: Uses NextAuth.js for secure login with Google OAuth and credentials.
- **API Routes**: All data operations (CRUD) are handled via Next.js API routes in the `app/api` directory.
- **Client/Server Components**: Data fetching and business logic are handled in Server Components; UI and interactivity are handled in Client Components.
- **Error Handling**: Common errors and solutions are documented in [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md).
- **Mock Data**: The app uses mock data for donors and campaigns by default. Connect to a real database for persistence.
- **Overlay/Modal**: Clicking "View" on a donor in the donor list opens an overlay with the donor's description.

---

For setup instructions, see below. For technical troubleshooting, see [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md).

## Server/Client Component Architecture (App Router)

This project uses the Next.js App Router. Data fetching (e.g., with Prisma) is handled in Server Components, while client-only logic (such as dynamic imports with `ssr: false`) is placed in separate Client Components. This separation is required to avoid build/runtime errors and to follow Next.js best practices.

For details on common errors and solutions related to this architecture, see [ERRORS_AND_SOLUTIONS.md](./ERRORS_AND_SOLUTIONS.md).
