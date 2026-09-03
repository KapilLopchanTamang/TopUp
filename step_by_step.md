# Step-by-Step Build Guide
## All Rounder Gaming Topup — Next.js Website (Vercel Free Tier)

Companion to `PRD-All-Rounder-Gaming-Topup.md`. Follow these steps in order.

---

## Phase 1 — Project Setup

1. **Create the Next.js app**
   ```bash
   npx create-next-app@latest arg-topup --typescript --tailwind --app --src-dir
   cd arg-topup
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "init"
   gh repo create arg-topup --public --source=. --push
   ```
   (Or create the repo on github.com and push manually.)

3. **Create a free Postgres database**
   - Go to [neon.tech](https://neon.tech) (or use Vercel's built-in "Storage → Postgres" tab, which is Neon under the hood) → create a free project → copy the connection string.

4. **Install Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```
   Paste the Neon connection string into `.env` as `DATABASE_URL`.

5. **Create `.env.local`** (never committed) with:
   ```
   DATABASE_URL=...
   NEXTAUTH_SECRET=... (run: openssl rand -base64 32)
   ADMIN_EMAIL=you@example.com
   ADMIN_PASSWORD_HASH=... (generate in step 12)
   WHATSAPP_NUMBER=9779863912884
   ```

---

## Phase 2 — Database Schema

6. **Define the Prisma schema** in `prisma/schema.prisma`:
   ```prisma
   model Game {
     id        String   @id @default(cuid())
     slug      String   @unique
     name      String
     imageUrl  String?
     sortOrder Int      @default(0)
     isActive  Boolean  @default(true)
     groups    PackageGroup[]
   }

   model PackageGroup {
     id        String   @id @default(cuid())
     gameId    String
     game      Game     @relation(fields: [gameId], references: [id], onDelete: Cascade)
     label     String?
     sortOrder Int      @default(0)
     rows      PackageRow[]
   }

   model PackageRow {
     id            String       @id @default(cuid())
     groupId       String
     group         PackageGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
     amountLabel   String
     price         String
     isHighlighted Boolean      @default(false)
     sortOrder     Int          @default(0)
   }

   model SiteSettings {
     id                 Int    @id @default(1)
     whatsappNumber     String
     facebookUrl        String?
     messengerUrl       String?
     paymentMethodsText String?
     promoBannerText    String?
   }
   ```

7. **Push schema and generate client**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

8. **Seed initial data** — create `prisma/seed.ts` with the four games (Free Fire, TikTok, PUBG Mobile, eFootball) and their package rows copied from the reference posters, then:
   ```bash
   npx tsx prisma/seed.ts
   ```

---

## Phase 3 — Public Storefront

9. **Build the data layer** — `src/lib/db.ts` exporting a singleton Prisma client (standard Next.js + Prisma pattern to avoid connection exhaustion in serverless).

10. **Home page** (`src/app/page.tsx`)
    - Fetch active games, render as a responsive grid of cards (image, name, "From Rs. X").
    - Add the trust-badge strip and promo banner (from `SiteSettings`).
    - Use `export const revalidate = 3600` (ISR) so pages stay fast but pick up admin changes hourly, or call `revalidatePath` from the admin save action for instant updates.

11. **Game detail page** (`src/app/games/[slug]/page.tsx`)
    - Fetch the game + its groups + rows.
    - Render each `PackageGroup` as a table/card list.
    - Each row gets a **Buy on WhatsApp** button:
      ```tsx
      const text = encodeURIComponent(
        `Hi! I want to order: ${game.name} – ${row.amountLabel} (Rs. ${row.price}). Please confirm.`
      );
      <a href={`https://wa.me/${whatsappNumber}?text=${text}`} target="_blank">Buy</a>
      ```

12. **Static pages**: `/payment-methods` and `/contact` — simple server components pulling text from `SiteSettings`.

13. **Layout & styling** — build the shared dark/neon theme (header, footer with Facebook/Messenger/WhatsApp links, disclaimer) in `src/app/layout.tsx` using Tailwind.

---

## Phase 4 — Admin Auth

14. **Generate the admin password hash** (one-time, locally):
    ```bash
    node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
    ```
    Put the result in `ADMIN_PASSWORD_HASH` (env var, not in code).

15. **Install and configure NextAuth**
    ```bash
    npm install next-auth bcryptjs
    ```
    In `src/app/api/auth/[...nextauth]/route.ts`, use the **Credentials provider**: on login, compare the submitted email/password against `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` from env — no database user table needed since there's only one admin.

16. **Protect `/admin/**`** with `src/middleware.ts`:
    ```ts
    export { default } from "next-auth/middleware";
    export const config = { matcher: ["/admin/:path*"] };
    ```

17. **Add basic login-attempt rate limiting** using Upstash Redis free tier (`@upstash/ratelimit` + `@upstash/redis`), or skip for v1 and revisit if abuse becomes an issue.

---

## Phase 5 — Admin Panel (CRUD)

18. **Admin dashboard** (`src/app/admin/page.tsx`) — server component listing all games with Edit/Delete/Add buttons.

19. **Game create/edit form** (`src/app/admin/games/[id]/edit/page.tsx`)
    - Client component with dynamic field arrays for package groups and rows (add/remove rows freely).
    - Submit via a **Server Action** that writes to Postgres through Prisma, then calls `revalidatePath("/")` and `revalidatePath("/games/[slug]")` so public pages update immediately.

20. **Settings page** (`src/app/admin/settings/page.tsx`) — edit WhatsApp number, Facebook/Messenger URLs, payment methods text, promo banner — single-row `SiteSettings` update.

21. **Image uploads** (if needed) — either:
    - a) keep it simple: admin pastes an external image URL, or
    - b) integrate Cloudinary's free tier for real uploads (needs its own API key, still free-tier compatible).

---

## Phase 6 — Deploy to Vercel

22. **Connect the repo**
    - Go to [vercel.com/new](https://vercel.com/new) → import the GitHub repo → framework auto-detected as Next.js.

23. **Add environment variables in Vercel dashboard** (Project → Settings → Environment Variables): `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your production URL), `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `WHATSAPP_NUMBER`.

24. **Deploy** — Vercel builds and deploys automatically. Every future `git push` to `main` auto-redeploys.

25. **Run the Prisma migration against production DB** (if not already pushed): either point `DATABASE_URL` locally at the same Neon DB during setup (simplest for a single-environment project), or add a `postinstall` script running `prisma generate` (schema push is usually done once from local).

26. **Verify**
    - Visit the `*.vercel.app` URL, confirm games load and WhatsApp buttons open correctly on a phone.
    - Log into `/admin`, edit a price, confirm it reflects on the public page within seconds.

27. **(Optional) Add a custom domain** — Vercel → Project → Settings → Domains → add your domain, update DNS records at your registrar.

---

## Phase 7 — Polish & Launch Checklist

- [ ] Test every WhatsApp button on mobile Chrome/Safari (correct number, correct pre-filled text).
- [ ] Add meta titles/descriptions per game page for SEO.
- [ ] Run Lighthouse (mobile) — target 90+; compress/resize images if needed.
- [ ] Enable Vercel Analytics (Project → Analytics tab, free tier).
- [ ] Double-check `.env.local` is in `.gitignore` and secrets are only in the Vercel dashboard, never committed.
- [ ] Share the live link on the Facebook Page / Messenger bio in place of the poster images.

---

## Quick Reference — Why each choice keeps this on Vercel's free tier
| Decision | Reason |
|---|---|
| External Postgres (Neon), not local JSON/SQLite | Vercel's serverless filesystem doesn't persist writes between requests/deploys |
| Static/ISR public pages | Fewer serverless function invocations, faster for customers |
| No custom auth server, NextAuth Credentials + env vars | No paid auth service needed for a single admin |
| WhatsApp links are plain `<a href>` | Zero backend dependency at the moment of checkout — works even if the DB has a hiccup |
| Upstash Redis (optional) instead of self-hosted Redis | Serverless-friendly, no persistent connection required, free tier available |