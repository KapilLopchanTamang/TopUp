# ARG TopUp — Game Top-Up Platform

A modern, high-performance web platform for browsing and purchasing game top-ups with instant WhatsApp fulfillment. Built with Next.js 16, React 19, Supabase Postgres, Prisma ORM, and NextAuth v5.

## Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack) & React 19
- **Database**: PostgreSQL (Supabase) via Prisma ORM
- **Authentication**: NextAuth.js v5 with JWT session strategy & Next 16 Proxy server guard
- **Styling & UI**: Tailwind CSS, shadcn/ui components, Framer Motion
- **Images**: Next.js optimized images under `public/images/`
- **Checkout Flow**: Instant WhatsApp redirect with prefilled order details

## Documentation

Full project documentation is organized in the [`docs/`](./docs) directory:

- **Product Requirements**: [`docs/product/prd.md`](./docs/product/prd.md)
- **Local Setup**: [`docs/setup/local.md`](./docs/setup/local.md)
- **Environment Variables**: [`docs/setup/env.md`](./docs/setup/env.md)
- **Supabase Integration**: [`docs/setup/supabase.md`](./docs/setup/supabase.md)
- **Vercel Deployment**: [`docs/deploy/vercel.md`](./docs/deploy/vercel.md)
- **Admin Portal**: [`docs/features/admin.md`](./docs/features/admin.md)
- **Images System**: [`docs/features/images.md`](./docs/features/images.md)
- **WhatsApp Checkout**: [`docs/features/whatsapp.md`](./docs/features/whatsapp.md)
- **Completed Milestones**: [`docs/changelog/completed.md`](./docs/changelog/completed.md)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Configure your PostgreSQL database URL, NextAuth secret, and admin credentials in `.env`. See [`docs/setup/env.md`](./docs/setup/env.md) for the exact specification.

### 3. Deploy Migrations and Seed Database

```bash
npx prisma migrate deploy
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to manage games and settings.

## Route Map

- `/` — Storefront homepage with featured games and banner
- `/games` — Game catalog grid
- `/games/[slug]` — Game package selection & WhatsApp order link
- `/payment-methods` — Supported manual payment guides
- `/contact` — Support and business contact info
- `/admin/login` — Administrator authentication
- `/admin` — Admin dashboard & game list
- `/admin/games/new` — Create game with pricing tiers
- `/admin/games/[id]/edit` — Edit game and package rows
- `/admin/settings` — Configure site-wide settings

## Verification

```bash
npm run lint         # ESLint validation
npx tsc --noEmit     # TypeScript compilation check
npm run build        # Production build with Prisma deploy
```
