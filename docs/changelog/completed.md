# Project Changelog & Completed Milestones

Summary of completed engineering milestones and enhancements.

## 1. Database & Schema
- Migrated database datasource to PostgreSQL (Supabase compatibility).
- Generated initial clean Postgres migration under `prisma/migrations/20260903090634_init/`.
- Seeded initial catalog data via `src/lib/seed-data.ts`.
- Implemented serverless-safe Prisma client in `src/lib/db.ts`.

## 2. Image Asset Consolidation
- Relocated scattered image assets from root `photos/`, `public/coin photo/`, `public/coins logo/`, and `public/games-img/` into structured paths:
  - `public/images/games/`
  - `public/images/coins/`
  - `public/images/uploads/`
- Renamed all filenames with spaces to clean kebab-case.
- Updated all seed scripts and upload API routes to reference `/images/*`.

## 3. Next.js 16 & Proxy Architecture
- Implemented Next.js 16 Proxy convention in `src/proxy.ts` to guard `/admin/*`.
- Configured ESLint with Flat Config (`eslint.config.mjs`) compatible with Next.js 16.
- Fixed `npm run lint` script to call `eslint .`.

## 4. Documentation Consolidation
- Cleaned root repository noise by removing obsolete markdown files.
- Consolidated all specifications, setup instructions, and feature guides under `docs/`.
