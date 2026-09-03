# Images & Asset Organization

Clean asset organization and image handling standards for ARG TopUp.

## 1. Directory Structure

All public visual assets are stored in dedicated directories under `public/images/`:

```
public/images/
├── games/     # Official cover artwork for supported games
├── coins/     # In-game currency logos, diamond icons, UC badges
└── uploads/   # User/admin uploaded screenshots and posters
```

- **Naming Convention**: Clean lowercase kebab-case (e.g., `free-fire.jpeg`, `pubg-mobile.jpg`). No spaces or uppercase characters.

## 2. Next.js `<Image />` Optimization

Components render local assets using `next/image` with responsive dimensions:

```tsx
<Image
  src={game.imageUrl}
  alt={game.name}
  fill
  className="object-cover"
/>
```

## 3. File Uploads in Production

- The local upload handler at `src/app/api/upload/route.ts` saves files to `public/images/uploads/` with a sanitized timestamped filename.
- **Important Note for Vercel**: The Vercel Serverless environment provides a read-only filesystem during execution. For long-term production uploads without git commits, configure external object storage (such as Supabase Storage, AWS S3, or Cloudinary) or use the direct image URL field provided in the admin form.
