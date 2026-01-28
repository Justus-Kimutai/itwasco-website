// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Public client (anon key) - respects RLS, used for public reads
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (service role key) - bypasses RLS, used for CRUD operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey);

// Blog post type
export interface BlogPost {
    id?: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    published: boolean;
    created_at?: string;
    updated_at?: string;
}

// Get all blog posts (admin - includes drafts)
export async function getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data || [];
}

// Get published posts only
export async function getPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data || [];
}

// Get single post by ID (admin)
export async function getPostById(id: number): Promise<BlogPost | null> {
    const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }

    return data;
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }

    return data;
}

// Create new post (admin)
export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
    const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .insert([post])
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        return null;
    }

    return data;
}

// Update post (admin)
export async function updatePost(id: number, post: Partial<BlogPost>): Promise<BlogPost | null> {
    const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .update({ ...post, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating post:', error);
        return null;
    }

    return data;
}

// Delete post (admin)
export async function deletePost(id: number): Promise<boolean> {
    const { error } = await supabaseAdmin
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting post:', error);
        return false;
    }

    return true;
}

// Upload image to Supabase Storage
export async function uploadImage(file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    const { error } = await supabaseAdmin.storage
        .from('images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }

    const { data: urlData } = supabaseAdmin.storage
        .from('images')
        .getPublicUrl(filePath);

    return urlData.publicUrl;
}
