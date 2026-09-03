# Admin Portal & Security

Overview of administrator management, authentication, and authorization guardrails in ARG TopUp.

## 1. Authentication Architecture

- **Library**: NextAuth.js v5 (beta) with CredentialsProvider.
- **Session Strategy**: JWT (JSON Web Tokens) stored in secure HTTP-only cookies.
- **Password Security**: Bcrypt hashes verified in server actions/authorizers. Plaintext passwords are never stored or logged.

## 2. Server-Side Guard (Next.js 16 Proxy)

In Next.js 16, edge/middleware protection is provided via `src/proxy.ts` (the Proxy convention). All paths matching `/admin/:path*` require an authenticated session.

- Unauthenticated users requesting `/admin` or `/admin/*` are automatically redirected to `/admin/login`.
- The login page at `/admin/login` allows the administrator to submit email and password.
- Successful authentication redirects to `/admin`.
- Signing out clears the JWT session cookie and redirects back to `/admin/login`.

## 3. Features

- **Dashboard (`/admin`)**: Summary of all games, package count, visibility toggles, and direct links to edit/create games.
- **Create Game (`/admin/games/new`)**: Configure game name, URL slug, image asset path/upload, package groups, and row pricing.
- **Edit Game (`/admin/games/[id]/edit`)**: Modify game details, reorder packages, toggle highlights, and update pricing tiers.
- **Settings (`/admin/settings`)**: Update customer service WhatsApp number, social media links, promotional banner text, and payment instructions.
