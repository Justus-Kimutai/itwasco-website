-- Supabase SQL Setup for ITWASCO Blog
-- Run this in your Supabase SQL Editor

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author VARCHAR(100) DEFAULT 'ITWASCO Team',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published for faster filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public (anon) users can only SELECT published posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Authenticated users get full read access (including drafts)
CREATE POLICY "Authenticated users can view all posts" ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert posts
CREATE POLICY "Authenticated users can create posts" ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update posts
CREATE POLICY "Authenticated users can update posts" ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete posts
CREATE POLICY "Authenticated users can delete posts" ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- NOTE: The admin panel uses the anon key. Since RLS restricts anon to
-- published SELECT only, admin CRUD operations require using the
-- service_role key instead. Update your .env with SUPABASE_SERVICE_ROLE_KEY
-- and use it for the admin supabase client.

-- ============================================
-- Storage Setup
-- ============================================
-- Create a public bucket for blog images.
-- Run this in the Supabase SQL Editor:
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the images bucket
CREATE POLICY "Public read access for images" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'images');

-- Allow admin (service role) to upload images
-- The service_role key bypasses RLS, so this policy is for authenticated users
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

-- ============================================
-- Sample Data
-- ============================================
-- Insert a sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, published)
VALUES (
  'Expanding Water Services Across Elgeyo Marakwet County',
  'expanding-water-services',
  'ITWASCO continues to make significant strides in expanding water services to more households and businesses.',
  'ITWASCO continues to make significant strides in expanding water services to more households and businesses across Elgeyo Marakwet County. Our latest infrastructure projects aim to increase our coverage and bring clean, reliable water to even more residents.

Over the past year, we have successfully connected over 1,000 new households to our water network, bringing our total active connections to 4,750+. This growth reflects our commitment to the mission of providing "Water for All" and aligns with Kenya Vision 2030.

Our ongoing projects include pipeline extensions to underserved areas, upgrades to our water treatment facilities, and the implementation of smart metering systems for better water management.

We remain dedicated to improving public health, supporting economic development, and enhancing the quality of life for every resident we serve.',
  '/images/blog/water-pipeline.jpg',
  'ITWASCO Team',
  true
);
