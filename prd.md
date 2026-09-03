# Product Requirements Document
## All Rounder Gaming Topup — Website

| | |
|---|---|
| **Doc owner** | Kapil Tamang |
| **Status** | Draft v1.0 |
| **Date** | 31 Aug 2026 |
| **Stack** | Next.js (App Router), Tailwind CSS, Vercel (Free/Hobby tier) |

---

## 1. Overview

All Rounder Gaming Topup (ARG) currently sells in-game currency (Free Fire Diamonds, PUBG UC, TikTok Coins, eFootball Coins, membership/level-up passes, etc.) through Facebook/Messenger poster posts, with orders closed manually over WhatsApp and payment via eSewa/Khalti/IME Pay/Bank Transfer.

This PRD defines a **storefront website** that replaces the poster-scrolling experience with a browsable, always-up-to-date price catalog. The site has **no online payment or cart checkout** — every "Buy" action simply opens WhatsApp with a pre-filled message containing the exact product and price, so the existing manual fulfillment/payment process is unchanged. The only backend complexity is a **single-admin panel** to add/edit/remove games and prices without redeploying code.

## 2. Goals

1. Give customers a fast, mobile-first way to browse all games and current prices in one place (replacing 4 separate poster images).
2. Every product has a one-tap **"Buy on WhatsApp"** button that opens `wa.me` with a pre-filled order message.
3. Let the single admin (owner) update games, packages, and prices from a simple protected dashboard — no code changes, no redeploy.
4. Run entirely on **Vercel's free Hobby tier** — no paid database, no paid compute, no server to manage.
5. Be trustworthy-looking: clear pricing, payment methods shown, contact info visible, "100% Secure / Instant Delivery" trust signals carried over from the existing posters.

### Success metrics
- WhatsApp click-through rate from product cards.
- Admin can publish a price change in under 2 minutes.
- Lighthouse mobile score ≥ 90 (site is used almost entirely on phones).
- Zero monthly hosting cost.

## 3. Non-goals / Out of scope (v1)
- No online payment gateway integration (eSewa/Khalti buttons are informational only, not functional checkout).
- No user accounts, order history, or cart.
- No multi-admin roles or permissions — **exactly one** admin login.
- No live order tracking/status system.
- No inventory/stock deduction logic (top-ups are effectively unlimited).

## 4. Users

| User | Need |
|---|---|
| **Customer (gamer)** | Quickly find their game, see current diamond/coin/UC prices, message the seller to order — mostly on a phone, often arriving from a Facebook/Instagram bio link. |
| **Admin (owner/you)** | Update prices weekly/monthly, add new games or packs, change the WhatsApp number, without touching code. |

## 5. Information Architecture / Site Map

```
/                     → Home: hero, trust badges, game category grid
/games                → All games list
/games/[slug]         → Single game page: full package/price table + Buy buttons
/payment-methods      → Static info page (eSewa, Khalti, IME Pay, Bank)
/contact              → WhatsApp / Facebook / Messenger links
/admin/login          → Admin sign-in (single account)
/admin                → Dashboard: list of games
/admin/games/new      → Create game
/admin/games/[id]/edit→ Edit game + its packages
/admin/settings       → Edit WhatsApp number, payment methods text, site banner/promo text
```

Based on the reference posters, the initial games to seed are:
- **Free Fire** — Diamonds (8 tiers: 115–965) + Level Up Pass (550) + Weekly (200) + Monthly (1000) Membership + a second diamond tier table (1090/1240)
- **TikTok** — Coins, Small Pack (11 tiers) + Big Pack (16 tiers)
- **PUBG Mobile** — UC (6 tiers)
- **eFootball** — Coins (9 tiers) + Suarez Pack + Goal Keeper Pack

## 6. Core User Flow

1. Customer lands on `/` or a `/games/[slug]` page (often via a shared link).
2. Customer scans the price table for the game and taps a package row's **"Buy"** button.
3. Button opens `https://wa.me/9779863912884?text=<pre-filled order message>` in a new tab/app.
4. Pre-filled message format:
   > `Hi! I want to order: [Game Name] – [Package Name] (Rs. [Price]). Please confirm.`
5. Seller continues the sale manually inside WhatsApp exactly as today (send payment QR, confirm, deliver top-up).

No further steps happen on the website — WhatsApp is the checkout.

## 7. Feature Requirements

### 7.1 Public Storefront
- Responsive game category cards on the homepage (image/icon + name + "From Rs. X").
- Each game page renders **one or more package groups** (e.g., "Small Pack" / "Big Pack", or "Diamonds" / "Membership") as tables or cards, matching the layout style of the reference posters (dark neon theme, price + Buy button per row).
- Each row: package amount (e.g., "115 💎"), price ("Rs. 100"), **Buy on WhatsApp** button.
- Trust-badge strip: Fast / Secure / Trusted / Best Price / Instant Delivery.
- Payment method icons (eSewa, Khalti, IME Pay, Bank Transfer) shown as informational trust signal, not clickable checkout.
- Footer: Facebook Page link, Messenger link, WhatsApp number, disclaimer ("Game assets belong to their respective owners").
- Search or a game filter/tab bar if the number of games grows beyond ~6.

### 7.2 WhatsApp Buy Button (core mechanic)
- Pure `<a>` tag / `Link` with a `wa.me` URL — **no server call needed**, so it works even if the backend/DB is briefly unavailable.
- Message text is URL-encoded and built from live data (game name, package label, price) so it always matches the displayed price.
- Optionally: a `Buy on Messenger` secondary button using `m.me/<page-username>`.

### 7.3 Admin Panel (single admin)
- **Login:** one hardcoded admin account (env-var email + hashed password), session via signed HTTP-only cookie (e.g., NextAuth Credentials provider or a lightweight custom JWT). No public sign-up, no password-reset UI in v1 (reset by rotating the env var if ever needed).
- **Dashboard:** list of games with quick edit/delete and "Add Game" button.
- **Game editor:**
  - Game name, slug, banner/icon image, sort order, active/hidden toggle.
  - One or more **package groups** (label optional, e.g. "Small Pack").
  - Within a group: repeatable rows of `{ amount label, price, sort order }`, add/remove rows freely.
  - Optional "highlight" flag per row (e.g., "Best For You" badge seen in the TikTok poster).
- **Settings page:** WhatsApp number, Facebook Page URL, Messenger URL, payment methods list (text), homepage promo banner text.
- All changes save immediately to the database and reflect on the public site (via revalidation — see §8).

### 7.4 Admin Auth & Security
- Route protection via Next.js `middleware.ts` guarding `/admin/**`.
- Rate-limit login attempts (simple in-memory or Upstash-based limiter) to reduce brute force risk.
- No public registration route exists at all — the single admin account is provisioned via environment variables, not a database sign-up flow.

## 8. Data Model

Minimal relational shape (works in any of the DB options in §9):

```
Game
 - id, slug, name, imageUrl, sortOrder, isActive

PackageGroup
 - id, gameId (FK), label (nullable), sortOrder

PackagePackageRow  (top-up item)
 - id, groupId (FK), amountLabel (e.g. "1120 COIN"), price (e.g. "Rs. 2,080"),
   isHighlighted (bool), sortOrder

SiteSettings (single row)
 - whatsappNumber, facebookUrl, messengerUrl, paymentMethodsText, promoBannerText
```

## 9. Technical Architecture (Vercel-compatible by design)

| Concern | Choice | Why it fits Vercel's free tier |
|---|---|---|
| Framework | Next.js 14+ App Router | Native, first-class Vercel support. |
| Rendering | Static/ISR for public pages (`revalidate` after admin edits or on-demand `revalidatePath`), dynamic Server Components for `/admin` | Fast for customers; avoids unnecessary function invocations. |
| Styling | Tailwind CSS | No build-time server dependency. |
| **Database** | **Neon Postgres (free tier)** *or* **Vercel Postgres (Hobby)** *or* **Supabase (free tier)** — pick one; Neon/Vercel Postgres recommended for simplest Prisma integration | Vercel's serverless functions have an **ephemeral, read-only-at-runtime filesystem** — you cannot persist admin edits to a local JSON file in production. A real hosted DB is required even for "just prices." |
| ORM | Prisma (or Drizzle) | Works well with serverless/edge Postgres drivers. |
| Auth | NextAuth.js Credentials provider (single user) or a minimal custom cookie/JWT | No paid auth service needed. |
| Images | `next/image` + Vercel's built-in image optimization, or a free image host (Cloudinary free tier) for admin-uploaded banners | Vercel's Hobby plan includes image optimization in its free quota. |
| API | Next.js Route Handlers (`app/api/**`) for admin CRUD | Runs as Vercel Serverless Functions — must stay short (<10s, Hobby plan limit) — fine for CRUD writes. |
| Rate limiting (login) | Upstash Redis (free tier) or simple in-memory fallback | Upstash is the standard Vercel-native, serverless-friendly option (no persistent connections needed, unlike a self-managed Redis). |
| Analytics | Vercel Analytics (free tier, generous limit) | Optional but zero extra cost. |
| Deployment | Connect GitHub repo → Vercel → auto-deploy on push to `main` | Free Hobby plan covers this project's traffic comfortably. |

### Vercel free-tier constraints to design around
- **No persistent local storage** between requests/deploys → all admin data must live in an external DB (see above), never in a local JSON/SQLite file.
- **Serverless function timeout:** 10s on Hobby plan → keep admin write operations simple (no bulk imports of thousands of rows in one request).
- **No long-running processes / WebSockets** → not needed here since there's no live chat or real-time order tracking.
- **Bandwidth/function invocation limits** are generous for a small catalog site; static/ISR pages minimize function calls anyway since most traffic hits cached pages, not API routes.
- **Environment variables** (DB connection string, admin credentials, WhatsApp number default, NextAuth secret) set in the Vercel project dashboard, not committed to the repo.

## 10. Non-functional Requirements
- **Mobile-first:** target audience opens this from Facebook/Instagram on a phone; design directly from the neon/poster aesthetic already used, but as responsive HTML, not an image.
- **Performance:** static-generated/ISR game pages, optimized images, Lighthouse mobile ≥ 90.
- **SEO:** basic meta tags per game page (e.g., "Free Fire Diamond Top Up Nepal — All Rounder Gaming Topup") so games are discoverable via search.
- **Reliability:** WhatsApp buttons must work even if the database/API is momentarily down, since they're static links generated at build/ISR time.
- **Security:** admin routes behind auth + middleware; no customer PII is ever collected or stored (no accounts, no payment data touches the site).

## 11. Milestones

| Phase | Scope |
|---|---|
| 1. Setup | Next.js + Tailwind + Vercel project + Postgres (Neon) + Prisma schema |
| 2. Public storefront | Home, games list, game detail page, WhatsApp buy links, static content pages |
| 3. Admin panel | Auth, dashboard, game/package CRUD, settings page |
| 4. Content seed | Enter existing catalog: Free Fire, TikTok, PUBG UC, eFootball (from current posters) |
| 5. Polish & launch | Responsive QA, SEO meta, Vercel Analytics, custom domain, go live |

## 12. Open Questions
- Should package **images/icons** (diamond, coin, UC icons) be a fixed small icon set per game, or admin-uploadable per row? (Recommend: fixed icon per game to keep admin form simple.)
- Do you want a **Messenger** buy button alongside WhatsApp, or WhatsApp-only for v1?
- Should highlighted/"Best For You" badges be manually toggled per package row, or automatic (e.g., most-clicked)? (Recommend manual toggle for v1 — no click tracking needed.)
- Custom domain now, or launch on the free `*.vercel.app` subdomain first?