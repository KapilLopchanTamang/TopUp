# All Rounder Gaming Topup — Production Deployment Guide

## ✅ Production-Ready Checklist

### Database Setup (Required for Vercel)
1. **Create a PostgreSQL database** — Choose one:
   - [Neon](https://neon.tech) (Recommended, generous free tier)
   - [Supabase](https://supabase.com) (Free tier available)
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Hobby tier)

2. **Get your connection string**:
   - Copy the **pooled connection string** from your database dashboard
   - Format: `postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require`

3. **Set environment variables in Vercel**:
   ```bash
   DATABASE_URL="your-postgres-connection-string"
   NEXTAUTH_SECRET="generate-with-openssl-rand-hex-32"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   ADMIN_EMAIL="your-admin-email@example.com"
   ADMIN_PASSWORD_HASH="generate-with-bcrypt"
   ```

4. **Generate admin password hash locally**:
   ```bash
   node -e "const b=require('bcryptjs'); b.hash('your-secure-password',10).then(console.log)"
   ```

5. **Push database schema**:
   ```bash
   npx prisma db push
   ```

6. **Seed initial data** (optional):
   ```bash
   npm run db:seed
   ```

### Vercel Deployment
1. **Connect repo to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework preset: Next.js (auto-detected)

2. **Configure environment variables** in Vercel dashboard under Settings → Environment Variables

3. **Deploy**:
   - Push to `main` branch triggers auto-deployment
   - Or click "Deploy" in Vercel dashboard

### Post-Deployment
- Test admin login at `/admin/login`
- Add your games via `/admin`
- Update WhatsApp number in Settings
- Verify all Buy buttons open WhatsApp correctly

### Custom Domain (Optional)
- Add custom domain in Vercel dashboard: Settings → Domains
- Update `NEXTAUTH_URL` environment variable to your custom domain

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your local database URL
# For local dev, you can use Neon's free tier

# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed initial data
npm run db:seed

# Start dev server
npm run dev
```

## 📦 Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: NextAuth.js (single admin account)
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel (free Hobby tier)

## 🔒 Security Features

- Security headers (X-Frame-Options, CSP, etc.)
- Admin route protection via middleware
- Bcrypt password hashing
- HTTP-only session cookies
- Environment-based secrets (never committed)

## 📱 Performance

- Static generation with ISR (revalidate: 3600s)
- Next.js Image optimization
- Lazy loading for images
- Mobile-first responsive design
- Lighthouse score target: 90+

## 🚀 Production Changes Applied

1. ✅ Migrated database from SQLite to PostgreSQL (Vercel-compatible)
2. ✅ Replaced `<img>` tags with Next.js `<Image />` for optimization
3. ✅ Added security headers in `next.config.ts`
4. ✅ Created `.env.example` for production setup
5. ✅ Simplified image uploads to URL-based (no local file storage)
6. ✅ Enhanced UI with stepped tonal surfaces and fluid typography
7. ✅ Added proper error boundaries and loading states

## 🎨 UI Enhancements

- Stepped tonal surface system (5 levels)
- Fluid typography with `clamp()`
- CSS Grid-first layouts
- Consistent spacing tokens
- Improved accessibility (44px touch targets, focus states)
- Better visual hierarchy

## 📞 Support

For issues or questions, contact the admin at the WhatsApp number configured in Settings.
