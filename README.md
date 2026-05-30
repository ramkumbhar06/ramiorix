# 🚀 Ramiorix — Career Platform

A premium, full-stack career platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Prisma**.

---

## ✨ Features

- **Job Listings** — Post, search, and filter jobs by category, location, experience
- **Interview Q&A** — Categorized questions for HR, SQL, Data Analyst, US Mortgage, Technical
- **Career Blog** — SEO-friendly blog with tags, categories, rich content
- **Fresher Guide** — Career roadmap and tips for fresh graduates
- **Admin Dashboard** — Secure admin panel to manage all content
- **Google Authentication** — NextAuth v5 with Google OAuth for admins

---

## 📁 Project Structure

```
ramiorix/
├── prisma/
│   └── schema.prisma          ← Database schema (tables)
├── src/
│   ├── app/                   ← All pages (Next.js App Router)
│   │   ├── page.tsx           ← Home page
│   │   ├── layout.tsx         ← Root layout
│   │   ├── sitemap.ts         ← Auto-generates sitemap.xml
│   │   ├── robots.ts          ← Auto-generates robots.txt
│   │   ├── jobs/              ← Jobs pages
│   │   │   ├── page.tsx       ← /jobs listing
│   │   │   └── [id]/page.tsx  ← /jobs/[id] detail
│   │   ├── blog/              ← Blog pages
│   │   │   ├── page.tsx       ← /blog listing
│   │   │   └── [slug]/page.tsx← /blog/[slug] detail
│   │   ├── interview/
│   │   │   └── page.tsx       ← /interview listing
│   │   ├── fresher/
│   │   │   └── page.tsx       ← /fresher guide
│   │   ├── admin/             ← Admin dashboard (protected)
│   │   │   ├── layout.tsx     ← Admin layout (checks auth)
│   │   │   ├── page.tsx       ← /admin dashboard
│   │   │   ├── login/page.tsx ← /admin/login
│   │   │   ├── jobs/          ← Job management
│   │   │   ├── blog/          ← Blog management
│   │   │   ├── questions/     ← Interview Q management
│   │   │   └── categories/    ← Category management
│   │   └── api/               ← API routes (backend)
│   │       ├── auth/          ← NextAuth handler
│   │       ├── jobs/          ← Jobs CRUD API
│   │       ├── blog/          ← Blog CRUD API
│   │       ├── questions/     ← Questions CRUD API
│   │       ├── categories/    ← Categories CRUD API
│   │       └── newsletter/    ← Newsletter signup API
│   ├── components/
│   │   ├── layout/            ← Navbar, Footer
│   │   ├── home/              ← Home page sections
│   │   ├── jobs/              ← JobCard, JobsPageClient
│   │   ├── interview/         ← InterviewPageClient
│   │   └── admin/             ← Admin forms, DeleteButton, Sidebar
│   ├── lib/
│   │   ├── prisma.ts          ← Prisma client (singleton)
│   │   ├── auth.ts            ← NextAuth config
│   │   └── utils.ts           ← Helper functions
│   ├── types/
│   │   └── index.ts           ← TypeScript types
│   └── styles/
│       └── globals.css        ← Global CSS + design tokens
├── .env.example               ← Copy this to .env.local
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠️ Setup Guide (Step by Step)

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))
- A Supabase account ([supabase.com](https://supabase.com)) — free tier works
- A Google Cloud account for OAuth

---

### Step 1 — Clone and Install

```bash
# Download the project
git clone https://github.com/yourusername/ramiorix.git
cd ramiorix

# Install all dependencies
npm install
```

---

### Step 2 — Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Choose a name (e.g. `ramiorix`) and set a strong database password
4. Select a region close to you (e.g. ap-south-1 for India)
5. Wait ~2 minutes for the project to be created

Get your database URLs:
1. In Supabase, go to **Settings → Database**
2. Scroll down to **"Connection String"**
3. Select **"URI"** mode and copy both:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_URL`

---

### Step 3 — Set Up Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Go to **APIs & Services → Credentials**
4. Click **"Create Credentials" → "OAuth 2.0 Client IDs"**
5. Application type: **Web application**
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local)
   - `https://your-domain.vercel.app/api/auth/callback/google` (for production)
7. Copy the **Client ID** and **Client Secret**

---

### Step 4 — Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
# From Supabase → Settings → Database
DATABASE_URL="postgresql://postgres.YOURREF:PASSWORD@pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.YOURREF:PASSWORD@pooler.supabase.com:5432/postgres"

# Generate with: openssl rand -base64 32
AUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# From Google Cloud Console
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# From Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_URL="https://YOURREF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

### Step 5 — Add Your Email as Admin

Open `src/lib/auth.ts` and add your Google email:

```typescript
const ADMIN_EMAILS = [
  "your-email@gmail.com",  // ← Add your email here!
];
```

---

### Step 6 — Set Up the Database

```bash
# Push the Prisma schema to Supabase (creates all tables)
npm run db:push

# Generate Prisma TypeScript types
npm run db:generate
```

Verify it worked:
```bash
# Opens a visual database explorer in your browser
npm run db:studio
```

---

### Step 7 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

**Admin Panel:** Go to [http://localhost:3000/admin](http://localhost:3000/admin) and sign in with your Google account.

---

## 🌐 Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ramiorix.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your `ramiorix` repository
4. In **"Environment Variables"**, add ALL the same variables from your `.env.local`
   - Change `NEXTAUTH_URL` to your Vercel URL: `https://ramiorix.vercel.app`
   - Change `NEXT_PUBLIC_APP_URL` to the same

5. Click **"Deploy"**

### Step 3 — Update Google OAuth Redirect

After deployment, add your Vercel URL to Google Cloud Console:
- Go back to your OAuth credentials
- Add: `https://your-app.vercel.app/api/auth/callback/google`

### Step 4 — Run Database Migration on Production

After deploy, in Vercel's dashboard:
- Go to **Deployments → Functions** and trigger:
  ```bash
  # Or run locally with production DATABASE_URL
  npm run db:push
  ```

---

## 📋 Seeding the Database

After setup, log into `/admin` with your Google account and:

1. **Add Categories** first (e.g. "Data Analyst" → type: "job", slug: "data-analyst")
2. **Post Jobs** from Admin → Jobs → Post New Job
3. **Write Blogs** from Admin → Blog → Write New Post
4. **Add Interview Questions** from Admin → Interview Q&A

---

## 🔧 Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Apply schema changes to DB
npm run db:generate  # Regenerate Prisma types
npm run db:studio    # Open visual DB browser
```

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.ts` → `theme.extend.colors.brand`

### Change Fonts
Edit `src/styles/globals.css` → Update the Google Fonts import and CSS variables

### Add Admin Emails
Edit `src/lib/auth.ts` → Add emails to `ADMIN_EMAILS` array

### Change Company Name / SEO
Edit `src/app/layout.tsx` → Update the `metadata` object

---

## 🏗️ Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Full-stack React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Prisma ORM | Database queries |
| Supabase | PostgreSQL database hosting |
| NextAuth v5 | Authentication |
| Lucide React | Icons |
| Vercel | Deployment |

---

Built with ❤️ for career seekers everywhere.
