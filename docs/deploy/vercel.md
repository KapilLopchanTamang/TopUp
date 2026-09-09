# Vercel Deployment

Deploying ARG TopUp to Vercel with Next.js 16 and Supabase Postgres.

## 1. Prerequisites

- Vercel account linked to your Git repository (GitHub/GitLab).
- Active Supabase project with database credentials.

## 2. Environment Variables

Set the following variables in your Vercel Project Settings (`Settings -> Environment Variables`):

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Supabase pooled connection string (Transaction mode, port 6543) | `postgresql://postgres.xxx:pass@aws-0-xxx.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Supabase direct connection string (Session mode, port 5432) | `postgresql://postgres.xxx:pass@aws-0-xxx.pooler.supabase.com:5432/postgres` |
| `NEXTAUTH_SECRET` | 32-character hex secret for signing session JWTs | Generate via `openssl rand -hex 32` |
| `NEXTAUTH_URL` | Production URL of your deployment | `https://your-domain.vercel.app` |
| `ADMIN_EMAIL` | Administrator email address | `admin@arg-topup.com` |
| `ADMIN_PASSWORD` | 12-digit admin password | `123456789012` |
| `WHATSAPP_NUMBER` | Contact WhatsApp number without symbols | `9779863912884` |

## 3. Build Configuration

The `package.json` build command handles Prisma schema generation and database migrations automatically:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

- Framework preset: Next.js
- Root directory: `./`
- Node.js version: 20.x or 22.x

## 4. Post-Deployment Database Seeding

To seed your initial catalog of games and packages on a fresh Supabase database:

```bash
# Run locally pointing to production DATABASE_URL
DATABASE_URL="postgresql://..." npm run db:seed
```

## 5. Automated Fork Sync & Deploy Hook

ARG TopUp includes a GitHub Actions workflow (`.github/workflows/sync-and-deploy.yml`) that automates production deployment:

- **Push / Sync**: Triggers on any push or "Sync fork" on the `main` branch.
- **Scheduled Sync**: Automatically checks upstream (`KapilLopchanTamang/TopUp:main`) every 6 hours and merges changes.
- **Deploy Hook**: Dispatches a POST request to Vercel Deploy Hook (`https://api.vercel.com/v1/integrations/deploy/prj_HUV8aE6qWIAnDHHYw7kVnQh9gDNA/YYVQFUcgYf`) to trigger a production build.
- **Manual Dispatch**: Can be run manually from the GitHub Actions tab at any time.

## 6. Verification Checklist

- [ ] Homepage loads with game catalog.
- [ ] Game details route `/games/[slug]` displays packages.
- [ ] Buy buttons open WhatsApp with pre-filled order messages.
- [ ] Admin login at `/admin/login` allows authentication.
- [ ] Unauthenticated requests to `/admin/*` redirect to `/admin/login`.
- [ ] Static assets under `/images/*` load properly.

