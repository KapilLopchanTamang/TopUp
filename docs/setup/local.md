# Local Development Setup

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (or other Postgres provider)

## Initial Setup

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd topup
   npm install
   ```

2. **Environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   - `DATABASE_URL` — Supabase Postgres connection string
   - `NEXTAUTH_SECRET` — Generate with `openssl rand -hex 32`
   - `ADMIN_EMAIL` — Your admin email
   - `ADMIN_PASSWORD` — Your 12-digit admin password (e.g. 123456789012)
   - `WHATSAPP_NUMBER` — Your WhatsApp number

   See [env.md](./env.md) for details.

3. **Database setup**
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

4. **Run dev server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Database Commands

- `npm run db:push` — Push schema changes (dev only)
- `npm run db:seed` — Seed games and packages
- `npm run db:studio` — Open Prisma Studio

## Admin Access

Navigate to `/admin/login` and use credentials from your `.env` file.

## Build

```bash
npm run build
npm start
```
