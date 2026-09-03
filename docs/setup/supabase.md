# Supabase Setup

ARG TopUp uses Supabase Postgres as the production database.

## Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Choose a region close to your users
4. Save the database password

## Get Connection String

1. Go to Project Settings → Database
2. Copy the **Connection Pooling** string (Transaction mode)
3. Set as `DATABASE_URL` in your `.env`
4. Replace `[YOUR-PASSWORD]` with your actual password

Example:
```
DATABASE_URL="postgresql://postgres.xyz:password@aws-0-region.pooler.supabase.com:5432/postgres?sslmode=require"
```

## Run Migrations

```bash
npx prisma migrate deploy
```

This applies the schema from `prisma/migrations/` to your Supabase database.

## Seed Data

```bash
npm run db:seed
```

Seeds initial games and packages from `prisma/seed.js`.

## Studio (optional)

View your database:
```bash
npm run db:studio
```
