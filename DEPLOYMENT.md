# 🚀 Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. Environment Variables
Create these in Vercel dashboard (Settings → Environment Variables):

```env
# Database (Production)
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-hex-32"
NEXTAUTH_URL="https://yoursite.vercel.app"

# Admin Credentials (Change these!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password-here"

# WhatsApp
WHATSAPP_NUMBER="9779843046108"
```

### 2. Database Setup (Choose One)

#### Option A: Vercel Postgres (Recommended)
1. Go to Vercel project → Storage tab
2. Click "Create Database" → Select "Postgres"
3. Copy the `DATABASE_URL` (shown after creation)
4. Add to environment variables
5. Deploy - migrations run automatically

#### Option B: Neon (Free PostgreSQL)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy "Pooled Connection String"
4. Add to Vercel environment variables as `DATABASE_URL`
5. Deploy

#### Option C: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy "Connection string" (Pooled)
5. Replace `[YOUR-PASSWORD]` with your database password
6. Add to Vercel environment variables

### 3. Generate NEXTAUTH_SECRET
```bash
openssl rand -hex 32
```
Copy the output and add to Vercel environment variables.

---

## 🔧 Deployment Steps

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: ARG Topup platform"
```

### Step 2: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create a new repository (e.g., "arg-topup")
3. Don't initialize with README (we already have one)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/arg-topup.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. Add environment variables (see section 1 above)

5. Click **Deploy**

### Step 5: Post-Deployment
1. Wait for deployment to complete (~2-3 minutes)
2. Visit your site at `https://yoursite.vercel.app`
3. Test the homepage loads
4. Go to `/admin` and log in
5. Upload images work? Test it!

---

## 🎯 What Happens During Build

```bash
1. npm install              # Install dependencies
2. prisma generate         # Generate Prisma Client
3. prisma migrate deploy   # Run database migrations
4. next build              # Build Next.js app
```

---

## ⚠️ Important Notes

### Database Migration
- **First deployment:** Prisma will create all tables automatically
- **Subsequent deployments:** Only new migrations run
- **Seed data:** Run manually if needed (see below)

### Uploaded Images
- Local images in `public/uploads/` will be deployed
- New uploads during production go to Vercel's file system
- ⚠️ **Note:** Vercel's filesystem is ephemeral on serverless
- For permanent storage, consider:
  - Vercel Blob Storage
  - Cloudinary
  - AWS S3
  - Or deploy to a server with persistent storage

### Admin Panel
- Access at: `https://yoursite.vercel.app/admin`
- Use credentials from environment variables
- Change default password immediately!

---

## 🔄 Seed Production Database (Optional)

If you want to populate the production database with sample data:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Run seed script
vercel env pull .env.production
DATABASE_URL="your-production-url" npm run db:seed
```

Or manually create games via the admin panel.

---

## 🐛 Common Issues & Solutions

### Build Fails: "Cannot find module 'prisma'"
**Solution:** Ensure `postinstall` script exists in package.json:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### "Invalid environment variables"
**Solution:** Double-check all required env vars are set in Vercel dashboard

### Images not loading
**Solution:** 
- Check `next.config.ts` allows your domain
- Verify images are in `public/uploads/`
- Use relative paths: `/uploads/image.jpg`

### Database connection fails
**Solution:**
- Verify `DATABASE_URL` connection string is correct
- Check database is accessible from Vercel's region
- Ensure `?sslmode=require` is in connection string for PostgreSQL

### Admin login doesn't work
**Solution:**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your production URL
- Ensure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set

---

## 📊 Post-Deployment Checklist

- [ ] Site loads at production URL
- [ ] Homepage displays games
- [ ] Game detail pages work
- [ ] WhatsApp links work correctly
- [ ] Admin panel accessible at `/admin`
- [ ] Admin login works
- [ ] Can create/edit games
- [ ] Image upload works
- [ ] Mobile responsive
- [ ] All links work

---

## 🎉 Success!

Your ARG Topup platform is now live! 

**Next steps:**
1. Update WhatsApp number if needed
2. Add your actual games via admin panel
3. Customize branding/colors
4. Share your site URL
5. Monitor via Vercel Analytics

**Your URLs:**
- Production: `https://yoursite.vercel.app`
- Admin Panel: `https://yoursite.vercel.app/admin`
- Vercel Dashboard: `https://vercel.com/dashboard`

---

## 📞 Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Prisma Docs: [prisma.io/docs](https://prisma.io/docs)

Happy deploying! 🚀
