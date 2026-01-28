# ITWASCO Blog Admin Setup Guide

## Overview
This guide will help you set up the blog admin system with free hosting on Render.

## What You Need (All Free!)
1. **GitHub Account** - You already have this
2. **Supabase Account** - Free database (500MB)
3. **Render Account** - Free web hosting

---

## Step 1: Set Up Supabase (Free Database)

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project (choose a region close to Kenya, e.g., "West EU")
3. Wait for the project to be created (~2 minutes)
4. Go to **SQL Editor** in the left sidebar
5. Copy and paste the contents of `supabase-setup.sql` and click **Run**
6. Go to **Settings → API** and copy:
   - Project URL (looks like: `https://xxxx.supabase.co`)
   - `anon` public key (a long string starting with `eyJ...`)

---

## Step 2: Set Up Environment Variables

1. Create a file called `.env` in the project root (copy from `.env.example`)
2. Fill in your values:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   ```

---

## Step 3: Test Locally

```bash
cd itwasco-website
npm install
npm run dev
```

Visit:
- Website: http://localhost:4321
- Admin: http://localhost:4321/admin

Login with:
- Username: `admin`
- Password: `itwasco2024` (or whatever you set)

---

## Step 4: Deploy to Render (Free Hosting)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click **New → Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name:** `itwasco-website`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/server/entry.mjs`
6. Add Environment Variables (in Render dashboard):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
7. Click **Create Web Service**

Your site will be live at: `https://itwasco-website.onrender.com`

---

## Admin Usage

### Accessing Admin
1. Go to `yoursite.com/admin`
2. Login with username and password
3. You'll see the dashboard with all blog posts

### Creating a Post
1. Click **New Post**
2. Fill in:
   - **Title** - The post headline
   - **Excerpt** - Short summary for the blog list
   - **Image URL** - Link to a featured image
   - **Content** - The full post text
   - **Published** - Check to make it visible
3. Click **Create Post**

### Editing a Post
1. Click **Edit** next to any post
2. Make your changes
3. Click **Update Post**

### Deleting a Post
1. Click **Delete** next to any post
2. Confirm the deletion

---

## Security Notes

- Change the default password before deploying!
- Environment variables are never exposed to the public
- Session cookies are HTTP-only and secure

---

## Troubleshooting

### "Failed to create post"
- Check your Supabase URL and key in `.env`
- Make sure you ran the SQL setup script

### "Invalid username or password"
- Check the `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `.env`
- Default is `admin` / `itwasco2024`

### Posts not showing on blog page
- Make sure the post is checked as "Published"
- Check browser console for errors

---

## Free Tier Limits

| Service | Free Limit |
|---------|------------|
| Render  | 750 hours/month (enough for 1 site) |
| Supabase | 500MB database, 50k API calls/month |

Both are generous enough for a small business blog!
