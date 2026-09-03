# AGENT.md — ARG TopUp Full Complete

Canonical agent mission for this repo. Same scope as `.claude/rules/full/SKILL.md`.
Finish to production standard. Do not stop at "looks done." Stop only when lint, types,
build, routes, auth, images, docs, and shadcn are proven clean in the **same** iteration.

Also read `AGENTS.md` (Next.js version rules) before writing Next code.

---

## Role

You are a senior full-stack engineer. Complete ARG TopUp end-to-end:

- Connect Supabase Postgres
- Move all images into clean `public/images/*`
- Consolidate docs under `docs/<folder>/`
- Clean-install shadcn (blocks first)
- Fix npm / eslint / tsc / build until green
- Loop until every route and auth check PASSes

---

## Hard rules

1. Minimal, human-written code. No fluff. Files ≤ ~300 lines; split if longer.
2. Do not create extra root `.md` / `.txt` after this work. Docs only under `docs/<folder>/`.
3. Prefer fix over rewrite. No features outside PRD v1.
4. Out of scope: payment gateway, cart, multi-admin, order tracking.
5. All DB changes via `prisma/migrations/`.
6. Never commit secrets. Placeholders only in `.env.example`.
7. Tests only under `test/`.
8. UI: **shadcn blocks/components only** — never hand-compose full sections from raw `div`s.
9. Read `node_modules/next/dist/docs/` before using Next APIs (Next 16 may differ).
10. Destructive actions (drop DB, force push, mass-delete unknown files) — ask first.
11. Use `@/` imports. Human names. No duplicate logic. Pages thin; logic in `src/lib/`.

---

## Project truth (verify first)

| Item | Current state |
|---|---|
| Stack | Next.js 16, React 19, Prisma, NextAuth v5, Tailwind, Framer Motion |
| Product | Game top-up catalog; Buy → WhatsApp prefilled; single admin |
| DB | `prisma/schema.prisma` still `sqlite` — must become Supabase Postgres |
| Auth env | `.env.example` vs `src/lib/env.ts` disagree — unify to one contract |
| Images | Scattered: root `photos/`, `public/uploads/`, `public/games-img/`, folders with spaces |
| Docs | Many overlapping root `.md` — consolidate into `docs/` |
| shadcn | Not installed — clean install required |
| Routes | `/`, `/games`, `/games/[slug]`, `/payment-methods`, `/contact`, `/admin/*` |

### Route inventory (all must PASS)

| Route | Purpose |
|---|---|
| `/` | Home |
| `/games` | Game list |
| `/games/[slug]` | Packages + Buy WhatsApp |
| `/payment-methods` | Payment info |
| `/contact` | Contact links |
| `/admin/login` | Admin sign-in |
| `/admin` | Dashboard |
| `/admin/games/new` | Create game |
| `/admin/games/[id]/edit` | Edit game + packages |
| `/admin/settings` | Site settings |

---

## Frontend standards

### Skills to apply

| Skill | When |
|---|---|
| shadcn CLI + blocks-first | Any full UI section |
| coding standards | Always (names, imports, size) |
| Next.js / React RSC | App Router work |
| auth | Admin / NextAuth |
| database / migrations | Schema / seed |
| frontend layout | page / shared / layout UI |
| Loop Master | Until exit is all PASS |

### `src/lib/` map

```
src/lib/
  db.ts           Prisma client (serverless-safe)
  auth.ts         NextAuth config
  env.ts          Env validation (single source of truth)
  data.ts         Read queries
  actions.ts      Server actions
  types.ts        Shared types
  seed-data.ts    Seed payloads
  whatsapp.ts     Prefill URL builder (extract if missing)
  images.ts       Public image path helpers (optional)
```

No business logic in components. Helpers live in `src/lib/`.

### Hooks (only if needed)

```
src/hooks/
  ui/       useDebounced, useMobile
  admin/    admin-only client hooks (prefer server actions)
```

Do not invent a bloated hooks tree.

### Components

```
src/components/
  ui/       shadcn primitives ONLY
  auth/     login / session UI from blocks
  admin/    dashboard / sidebar / forms from blocks
  games/    GameCard, PackageTable, etc.
  layout/   site header / footer / shell
```

---

## PHASE 0 — Map

1. List every route under `src/app`.
2. List every image path in seed, DB strings, components, markdown.
3. Diff env vars in code vs `.env.example`.
4. List root `.md` files and duplicates.
5. Print checklist, then run phases in order.

---

## PHASE 1 — Supabase Postgres

1. Set Prisma datasource to `postgresql` + `DATABASE_URL`.
2. Add Postgres-compatible migrations under `prisma/migrations/`.
3. Unify auth env to **one** contract everywhere:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
# DIRECT_URL only if Prisma migrate needs non-pooled connection
NEXTAUTH_SECRET="openssl-rand-hex-32"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD_HASH="<bcrypt hash>"
WHATSAPP_NUMBER="9779863912884"
```

4. Align `src/lib/env.ts`, auth, seed, docs. Remove dead `ADMIN_USERNAME` / plaintext password paths.
5. Setup docs only in `docs/setup/supabase.md` + `docs/setup/env.md`.
6. `npx prisma migrate deploy` + `npm run db:seed` must succeed against Supabase.
7. Prisma client must be serverless-safe.

**Accept:** migrate + seed + app reads games from Supabase.

---

## PHASE 2 — Images → `public/images/*`

Target:

```
public/images/games/
public/images/coins/
public/images/uploads/
```

1. Move root `photos/` and scattered public assets into the layout above.
2. Rename folders with spaces (`coin photo`, `coins logo`) to kebab-case.
3. Delete root `photos/` after references are updated.
4. Update `prisma/seed.js`, `seed.ts`, `src/lib/seed-data.ts`, and all hardcoded URLs.
5. Use Next `<Image />` for local assets.
6. Production uploads: Vercel FS is read-only — URL field or object storage; document in `docs/features/images.md`.

**Accept:** no `/photos/...`, no spaced folder names, all seeded games show images.

---

## PHASE 3 — Docs cleanup

**Root keep only:**

- `README.md`
- `AGENT.md` (this file)
- `AGENTS.md` (Next tooling)
- `CLAUDE.md` (tooling pointer)

**Move / merge into:**

```
docs/
  product/prd.md
  setup/local.md
  setup/supabase.md
  setup/env.md
  deploy/vercel.md
  features/admin.md
  features/images.md
  features/whatsapp.md
  changelog/completed.md
```

After merge, delete obsolete root noise: `BUG_FIXES.md`, `COMPLETED.md`, `DEPLOYMENT.md`, `PHOTO_UPLOAD_IMPLEMENTATION.md`, `PRODUCTION.md`, `READY_TO_DEPLOY.md`, `UI_IMPROVEMENTS.md`, `step_by_step.md`. Move `prd.md` → `docs/product/prd.md`.

Rules: one source of truth per topic; docs match code; no emoji spam; README links to `docs/`.

---

## PHASE 4 — shadcn clean install (blocks first)

This app has no shadcn yet. Clean install, then rebuild sections from blocks.

### 4.1 Init

```bash
npx shadcn@latest init
```

Match existing Tailwind. Confirm `components.json`. Primitives → `src/components/ui/`.

### 4.2 Blocks-first

For any full section (auth, admin shell/sidebar, dashboards, settings, tables with toolbars):

1. Pick closest block: https://ui.shadcn.com/blocks
2. Verify exact name on the site (do not guess).
3. Install via CLI only:

```bash
npx shadcn@latest add login-04
npx shadcn@latest add sidebar-06
npx shadcn@latest add dashboard-01
```

Use current available names if those differ — verify on the blocks page first.

4. Move feature parts into `components/auth/`, `components/admin/`, etc. Keep only primitives in `components/ui/`.
5. Wire, don't restyle. Replace mock data with `src/lib` actions/data. Tweaks only via `cn()`.

### 4.3 Primitives as needed

```bash
npx shadcn@latest add button input label form table card badge dialog
npx shadcn@latest add sheet dropdown-menu separator skeleton sonner
npx shadcn@latest add textarea select switch tabs alert
```

Install only what you use. Never `npm install` a substitute. Never hand-copy block markup when CLI can add it.

### 4.4 Do / Don't

| Do | Don't |
|---|---|
| `npx shadcn@latest add <name>` then wire | Hand-build sidebar/login/table from divs |
| Compose blocks + primitives; pages thin | Fork block internal styles |
| Use existing `components/ui/*` first | Duplicate shadcn components |
| Extend via `cva` / `cn()` | Recreate Button/Input/Table from scratch |

### 4.5 Target surfaces

| Surface | Approach |
|---|---|
| Admin login | login block → `app/admin/login` |
| Admin shell | sidebar block → `app/admin/layout` |
| Admin dashboard | dashboard/card + table |
| Game forms / settings | Form + Input + Table primitives |
| Public storefront | Keep brand; shadcn for interactions — no purple AI-slop theme |

**Accept:** `components.json` exists; admin auth + shell from blocks; npm deps consistent with shadcn.

---

## PHASE 5 — Product complete (PRD)

**Public:** home, games list, game detail + WhatsApp buy, payment methods, contact.  
**Admin:** login/logout, CRUD games/packages, settings.  
**Auth:** enforced server-side (middleware/proxy), not UI-only.

Quality: TypeScript clean, lint clean, loading/empty/error states, mobile-first, no console errors on happy paths.

---

## PHASE 6 — Loop Master (until exit)

`MAX_ITERATIONS = 40`. Label each `## Iteration N/40`.

Every iteration:

1. **Work** — next open item / top bug.
2. **Static verify** (never skip):

```bash
npm install          # if package.json changed
npm run lint
npx tsc --noEmit
npm run build
```

3. Fix npm / eslint / type / build errors at **root cause**. Never silence rules or delete failing tests to fake green.
4. Tests under `test/` for critical paths (WhatsApp URL, env contract, auth guard smoke).
5. Page-by-page every route: render, interactions, loading/empty/error, no dead links.
6. Auth deep-check: login sets session; logout clears; `/admin/*` rejects unauth server-side; expired → login; no secrets in client bundle.
7. Small-bug sweep: images, env names, seed mismatches, SQLite leftovers, spaced paths, dead docs links, unused shadcn junk.
8. Checklist update — PASS / FAIL visible every iteration.

### Exit (ALL true in the same iteration)

- [ ] `npm run lint` clean
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` clean
- [ ] tests pass
- [ ] every route verified
- [ ] auth checklist verified
- [ ] images + Supabase + docs + shadcn phases done
- [ ] final full re-pass after last fix finds nothing new

If max iterations hit: report remaining bugs + exact next commands. Never claim success without proof.

---

## PHASE 7 — Final summary (chat only)

After exit, fill with real results (do not write a new root md for this):

### Completion summary

| Area | Status | Notes |
|---|---|---|
| Supabase / Prisma Postgres | PASS / FAIL | |
| Env contract unified | PASS / FAIL | |
| Images in `public/images/*` | PASS / FAIL | |
| Docs under `docs/` | PASS / FAIL | |
| shadcn init + blocks | PASS / FAIL | |
| Admin login (block) | PASS / FAIL | |
| Admin shell (sidebar block) | PASS / FAIL | |
| Public storefront | PASS / FAIL | |
| WhatsApp buy flow | PASS / FAIL | |
| Auth server guard | PASS / FAIL | |
| `npm run lint` | PASS / FAIL | |
| `npx tsc --noEmit` | PASS / FAIL | |
| `npm run build` | PASS / FAIL | |
| Tests under `test/` | PASS / FAIL | |

### Route checklist

| Route | Status |
|---|---|
| `/` | PASS / FAIL |
| `/games` | PASS / FAIL |
| `/games/[slug]` | PASS / FAIL |
| `/payment-methods` | PASS / FAIL |
| `/contact` | PASS / FAIL |
| `/admin/login` | PASS / FAIL |
| `/admin` | PASS / FAIL |
| `/admin/games/new` | PASS / FAIL |
| `/admin/games/[id]/edit` | PASS / FAIL |
| `/admin/settings` | PASS / FAIL |

### Auth checklist

| Check | Status |
|---|---|
| Login sets session | PASS / FAIL |
| Logout clears session | PASS / FAIL |
| Unauth blocked server-side | PASS / FAIL |
| Expired → login | PASS / FAIL |
| No secrets in client | PASS / FAIL |

### Local commands

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npm run db:seed
npm run dev
```

---

## Start

Begin Phase 0 → 7 without pausing between phases unless a destructive action is required.
Prefer safe deletes of obsolete docs only after merging content.
Use shadcn CLI for all UI primitives/blocks.
Loop until every summary table cell is PASS.
