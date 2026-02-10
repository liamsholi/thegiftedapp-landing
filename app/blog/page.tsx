"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/supabase";

// Define categories with their display names and associated tags
const CATEGORIES = [
  { id: "all", name: "All Posts", tags: [] },
  { id: "gift-ideas", name: "Gift Ideas", tags: ["Birthday", "Christmas", "Anniversary", "Valentine's Day", "Father's Day", "Gifts for Her", "Gifts for Him", "Housewarming", "Best Friend"] },
  { id: "budget", name: "Budget Friendly", tags: ["Under £25", "Under £30", "Under £50", "Budget", "Affordable"] },
  { id: "occasions", name: "Occasions", tags: ["Birthday", "Christmas", "Anniversary", "Valentine's Day", "Father's Day", "Holiday", "Housewarming", "Milestones"] },
  { id: "tips", name: "Tips & Advice", tags: ["Tips", "Advice", "Psychology", "Research", "Gift Giving"] },
  { id: "sustainable", name: "Eco-Friendly", tags: ["Sustainable", "Eco-Friendly", "Green"] },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "all") {
      const category = CATEGORIES.find((c) => c.id === selectedCategory);
      if (category && category.tags.length > 0) {
        filtered = filtered.filter((post) =>
          post.tags?.some((tag) => category.tags.includes(tag))
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  // Get unique tags for display
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="Gifted" width={36} height={36} />
            <span className="text-xl font-bold">
              <span className="text-[#FF6B6B]">G</span>ifted
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-[#FF6B6B] font-medium text-sm">
              Blog
            </Link>
            <Link href="/#signup" className="btn-primary text-sm py-2 px-5">
              Get Early Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-8 px-6 bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Gift Ideas & Inspiration
            </h1>
            <p className="text-neutral-600">
              Discover thoughtful gift ideas, expert tips, and inspiration for every occasion.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-[#FF6B6B] text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[3/2] bg-neutral-200" />
                  <div className="p-5">
                    <div className="h-4 bg-neutral-200 rounded w-1/3 mb-3" />
                    <div className="h-5 bg-neutral-200 rounded w-full mb-2" />
                    <div className="h-5 bg-neutral-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <span className="text-5xl mb-4 block">🔍</span>
              <h2 className="text-xl font-semibold mb-2">No posts found</h2>
              <p className="text-neutral-600 mb-4">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "No posts in this category yet"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-[#FF6B6B] font-medium hover:underline"
              >
                View all posts
              </button>
            </div>
          ) : (
            <>
              {/* Results count */}
              <p className="text-sm text-neutral-500 mb-6">
                {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                {selectedCategory !== "all" && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition h-full"
                    >
                      {post.cover_image && (
                        <div className="aspect-[3/2] relative bg-neutral-100 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-[#FFF5F5] text-[#FF6B6B] text-xs font-medium rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <h2 className="font-semibold text-neutral-900 mb-2 group-hover:text-[#FF6B6B] transition line-clamp-2">
                          {post.title}
                        </h2>
                        
                        {post.excerpt && (
                          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                        )}
                        
                        <time className="text-xs text-neutral-400">
                          {post.published_at &&
                            new Date(post.published_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                        </time>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Find gifts faster with Gifted
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Swipe through curated gift ideas and save favourites to wishlists. Coming soon to iOS & Android.
            </p>
            <Link
              href="/#signup"
              className="inline-block bg-white text-[#FF6B6B] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.svg" alt="Gifted" width={28} height={28} />
              <span className="font-bold text-sm">
                <span className="text-[#FF6B6B]">G</span>ifted
              </span>
            </Link>

            <div className="flex gap-6 text-sm text-neutral-500">
              <Link href="/blog" className="hover:text-[#FF6B6B] transition">
                Blog
              </Link>
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Privacy
              </a>
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Terms
              </a>
            </div>

            <p className="text-sm text-neutral-400">© 2026 Gifted</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
