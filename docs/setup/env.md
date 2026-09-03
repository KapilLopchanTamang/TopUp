# Environment Variables

Required environment variables for ARG TopUp. Copy `.env.example` to `.env` and fill in real values.

## Database

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
```

- `DATABASE_URL` — Supabase Postgres connection string (use pooled connection)
- `DIRECT_URL` — Direct connection for Prisma migrations (optional, only if using connection pooler)

## NextAuth

```bash
NEXTAUTH_SECRET="your-32-char-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

- `NEXTAUTH_SECRET` — Generate with: `openssl rand -hex 32`
- `NEXTAUTH_URL` — Full site URL (http://localhost:3000 for dev)

## Admin Credentials

```bash
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD_HASH="$2a$10$..."
```

- `ADMIN_EMAIL` — Email for admin login
- `ADMIN_PASSWORD_HASH` — bcrypt hash of password

Generate hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## WhatsApp

```bash
WHATSAPP_NUMBER="9779863912884"
```

- `WHATSAPP_NUMBER` — Number for WhatsApp buy links (without + or spaces)

## Production

Set all vars in Vercel project settings. Never commit `.env` to git.
