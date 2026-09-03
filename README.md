# ARG Topup - Game Top-Up Platform

A modern, secure platform for purchasing game currency and digital goods. Built with Next.js 16, Prisma, and NextAuth.

![ARG Topup](public/uploads/freefire.jpeg)

## 🚀 Features

- 🎮 **Multi-Game Support** - Free Fire, PUBG Mobile, TikTok Coins, eFootball, and more
- 🔐 **Secure Admin Panel** - Protected with NextAuth authentication
- 📸 **Image Upload System** - Local image hosting with secure file uploads
- 💰 **Dynamic Pricing** - Flexible pricing groups and highlighted best deals
- 📱 **WhatsApp Integration** - Direct order placement via WhatsApp
- 🎨 **Premium Dark UI** - Modern, responsive design with smooth animations
- ⚡ **Next.js 16** - Using latest features with Turbopack

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Database:** SQLite (dev) / PostgreSQL (production)
- **ORM:** Prisma
- **Authentication:** NextAuth v5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **TypeScript:** Full type safety

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd topup
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="generate-with-openssl-rand-hex-32"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"
WHATSAPP_NUMBER="9779843046108"
```

4. **Set up database:**
```bash
npm run db:push
npm run db:seed
```

5. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string (Vercel Postgres, Neon, or Supabase)
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -hex 32`
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://yoursite.vercel.app`)
   - `ADMIN_USERNAME` - Admin username
   - `ADMIN_PASSWORD` - Admin password
   - `WHATSAPP_NUMBER` - Your WhatsApp number

5. Click "Deploy"

### 3. Set Up Production Database

**Option A: Vercel Postgres** (Recommended)
```bash
# In your Vercel project dashboard
1. Go to Storage tab
2. Create Postgres Database
3. Copy DATABASE_URL to environment variables
```

**Option B: Neon** (Free PostgreSQL)
```bash
1. Sign up at neon.tech
2. Create a new project
3. Copy the connection string
4. Add to Vercel environment variables
```

### 4. Run Database Migration

Vercel will automatically run:
```bash
prisma generate && prisma migrate deploy
```

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Database seed data
├── public/
│   └── uploads/          # Uploaded game images
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── admin/        # Admin panel routes
│   │   ├── api/          # API routes (upload, auth)
│   │   ├── games/        # Game detail pages
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   │   ├── actions.ts    # Server actions
│   │   ├── auth.ts       # NextAuth config
│   │   ├── data.ts       # Database queries
│   │   └── env.ts        # Environment validation
│   └── proxy.ts          # Next.js 16 proxy (middleware)
└── scripts/              # Utility scripts
```

## 🔒 Security Features

- ✅ Environment variable validation
- ✅ Input sanitization and validation
- ✅ Secure file upload (5MB limit, type validation)
- ✅ Admin authentication required
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection (React escaping)
- ✅ CSRF protection (NextAuth)

## 🎮 Admin Panel

Access at `/admin` with credentials from `.env`

**Features:**
- Create/Edit/Delete games
- Upload game images (drag & drop)
- Manage pricing groups
- Toggle game visibility
- Reorder games

## 📸 Image Upload

Admin can upload images directly:
- **Formats:** JPEG, PNG, WebP
- **Max Size:** 5MB
- **Storage:** `public/uploads/`
- **Auto-optimization:** Yes (Next.js Image)

## 🛒 Order Flow

1. User selects game
2. Chooses package
3. Clicks "Order via WhatsApp"
4. Pre-filled WhatsApp message opens
5. User sends order
6. Admin processes manually

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `NEXTAUTH_SECRET` | NextAuth secret key | `openssl rand -hex 32` |
| `NEXTAUTH_URL` | Site URL | `http://localhost:3000` |
| `ADMIN_USERNAME` | Admin username | `admin` |
| `ADMIN_PASSWORD` | Admin password | `secure-password` |
| `WHATSAPP_NUMBER` | WhatsApp number | `9779843046108` |

## 🐛 Troubleshooting

**Build fails on Vercel:**
- Check environment variables are set
- Ensure PostgreSQL connection string is correct
- Verify all migrations are committed

**Images not loading:**
- Check `public/uploads/` directory exists
- Verify image paths start with `/uploads/`
- Ensure Next.js image configuration is correct

**Admin login fails:**
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
- Check `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your domain

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue first to discuss changes.

## 📧 Contact

For support, contact via WhatsApp: +977 9843046108

---

Built with ❤️ using Next.js 16
