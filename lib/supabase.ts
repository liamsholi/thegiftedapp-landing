import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  created_at: string;
  updated_at: string;
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

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

export async function getAllPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  return data?.map(p => p.slug) || [];
}

export interface BlogTheme {
  fontSize: "small" | "base" | "large";
  lineHeight: "tight" | "normal" | "relaxed";
  maxWidth: "xl" | "2xl" | "3xl";
  headingSize: "small" | "normal" | "large";
  paragraphSpacing: "tight" | "normal" | "relaxed";
}

export async function getBlogTheme(): Promise<BlogTheme> {
  const defaultTheme: BlogTheme = {
    fontSize: "base",
    lineHeight: "normal",
    maxWidth: "2xl",
    headingSize: "normal",
    paragraphSpacing: "normal",
  };

  const { data, error } = await supabase
    .from('blog_settings')
    .select('setting_value')
    .eq('setting_key', 'theme')
    .single();

  if (error || !data) {
    return defaultTheme;
  }

  return data.setting_value as BlogTheme;
}
