"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/supabase";

interface BlogTheme {
  fontSize: "small" | "base" | "large";
  lineHeight: "tight" | "normal" | "relaxed";
  maxWidth: "xl" | "2xl" | "3xl";
  headingSize: "small" | "normal" | "large";
  paragraphSpacing: "tight" | "normal" | "relaxed";
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"posts" | "settings">("posts");
  const [blogTheme, setBlogTheme] = useState<BlogTheme>({
    fontSize: "base",
    lineHeight: "normal",
    maxWidth: "2xl",
    headingSize: "normal",
    paragraphSpacing: "normal",
  });
  const [savingTheme, setSavingTheme] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    author: "The Gifted Team",
    tags: "",
    published: false,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      loadPosts();
      loadThemeSettings();
    }
    setIsLoading(false);
  }

  async function loadThemeSettings() {
    const { data, error } = await supabase
      .from("blog_settings")
      .select("setting_value")
      .eq("setting_key", "theme")
      .single();
    
    if (data && !error) {
      setBlogTheme(data.setting_value as BlogTheme);
    }
  }

  async function saveThemeSettings() {
    setSavingTheme(true);
    
    // First try to update existing record
    const { error: updateError } = await supabase
      .from("blog_settings")
      .update({
        setting_value: blogTheme,
        updated_at: new Date().toISOString(),
      })
      .eq("setting_key", "theme");
    
    if (updateError) {
      // If update fails, try insert
      const { error: insertError } = await supabase
        .from("blog_settings")
        .insert({
          setting_key: "theme",
          setting_value: blogTheme,
          updated_at: new Date().toISOString(),
        });
      
      setSavingTheme(false);
      if (insertError) {
        setMessage("Error saving theme settings: " + insertError.message);
      } else {
        setMessage("Theme settings saved!");
      }
    } else {
      setSavingTheme(false);
      setMessage("Theme settings saved!");
    }
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleMagicLinkLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setLoginSuccess("Check your email! We sent you a magic link to sign in.");
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setIsAuthenticated(true);
      loadPosts();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPosts([]);
  }

  async function loadPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function startNewPost() {
    setIsNewPost(true);
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      author: "The Gifted Team",
      tags: "",
      published: false,
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
    });
  }

  function editPost(post: BlogPost) {
    setIsNewPost(false);
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image: post.cover_image || "",
      author: post.author,
      tags: post.tags?.join(", ") || "",
      published: post.published,
      seo_title: post.seo_title || "",
      seo_description: post.seo_description || "",
      seo_keywords: post.seo_keywords?.join(", ") || "",
    });
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const postData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      excerpt: formData.excerpt || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      author: formData.author,
      tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
      seo_title: formData.seo_title || null,
      seo_description: formData.seo_description || null,
      seo_keywords: formData.seo_keywords ? formData.seo_keywords.split(",").map(k => k.trim()) : null,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (isNewPost) {
      const result = await supabase.from("blog_posts").insert(postData);
      error = result.error;
    } else if (editingPost) {
      const result = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);
      error = result.error;
    }

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Post saved successfully!");
      loadPosts();
      setEditingPost(null);
      setIsNewPost(false);
    }

    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Post deleted");
      loadPosts();
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">
            <span className="text-[#FF6B6B]">G</span>ifted Admin
          </h1>
          <p className="text-neutral-500 text-center mb-6">Blog Management</p>
          
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
              {loginError}
            </div>
          )}
          
          {loginSuccess && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">
              ✓ {loginSuccess}
            </div>
          )}

          {!showPasswordLogin ? (
            // Magic Link Login (default)
            <form onSubmit={handleMagicLinkLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF6B6B] text-white py-3 rounded-lg font-semibold hover:bg-[#FA5252] transition"
              >
                Send Magic Link ✨
              </button>
              
              <p className="text-center text-sm text-neutral-500">
                We&apos;ll email you a secure link to sign in
              </p>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">or</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setShowPasswordLogin(true)}
                className="w-full border border-neutral-300 text-neutral-700 py-3 rounded-lg font-medium hover:bg-neutral-50 transition"
              >
                Sign in with Password
              </button>
            </form>
          ) : (
            // Password Login
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF6B6B] text-white py-3 rounded-lg font-semibold hover:bg-[#FA5252] transition"
              >
                Sign In
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">or</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setShowPasswordLogin(false)}
                className="w-full border border-neutral-300 text-neutral-700 py-3 rounded-lg font-medium hover:bg-neutral-50 transition"
              >
                Use Magic Link Instead ✨
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Editor view
  if (editingPost || isNewPost) {
    return (
      <div className="min-h-screen bg-neutral-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {isNewPost ? "New Post" : "Edit Post"}
            </h1>
            <button
              onClick={() => {
                setEditingPost(null);
                setIsNewPost(false);
              }}
              className="text-neutral-600 hover:text-neutral-900"
            >
              ← Back to Posts
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              {message}
            </div>
          )}

          <form onSubmit={savePost} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: formData.slug || generateSlug(e.target.value),
                  });
                }}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] text-lg"
                placeholder="Your amazing blog post title"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-2">URL Slug</label>
              <div className="flex items-center">
                <span className="text-neutral-500 mr-2">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                rows={2}
                placeholder="A brief summary that appears in the blog list..."
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold mb-2">Cover Image URL</label>
              <input
                type="url"
                value={formData.cover_image}
                onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                placeholder="https://example.com/image.jpg"
              />
              {formData.cover_image && (
                <img
                  src={formData.cover_image}
                  alt="Preview"
                  className="mt-2 rounded-lg max-h-48 object-cover"
                />
              )}
              <p className="text-xs text-neutral-500 mt-1">
                Tip: Use Unsplash, Pexels, or upload to Imgur for free image hosting
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-2">Content * (Markdown supported)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-mono text-sm"
                rows={20}
                placeholder={`# Your Heading

Write your content here using Markdown:

## Subheading

Regular paragraph text. **Bold text** and *italic text*.

- Bullet point 1
- Bullet point 2

> This is a quote

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)`}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                placeholder="Gift Ideas, Birthday, Tips (comma separated)"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold mb-2">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
            </div>

            {/* SEO Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">🔍 SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                    placeholder="Custom title for search engines (leave blank to use post title)"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {formData.seo_title.length}/60 characters (recommended)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">SEO Description</label>
                  <textarea
                    value={formData.seo_description}
                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                    rows={2}
                    placeholder="Description that appears in search results..."
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {formData.seo_description.length}/160 characters (recommended)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">SEO Keywords</label>
                  <input
                    type="text"
                    value={formData.seo_keywords}
                    onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                    placeholder="gift ideas, birthday presents, unique gifts (comma separated)"
                  />
                </div>
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded text-[#FF6B6B] focus:ring-[#FF6B6B]"
              />
              <label htmlFor="published" className="font-medium">
                Publish this post (make it visible on the blog)
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#FF6B6B] text-white py-3 rounded-lg font-semibold hover:bg-[#FA5252] transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Post"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingPost(null);
                  setIsNewPost(false);
                }}
                className="px-6 py-3 border rounded-lg hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Posts list view
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-[#FF6B6B]">G</span>ifted Blog Admin
          </h1>
          <div className="flex gap-4">
            {activeTab === "posts" && (
              <button
                onClick={startNewPost}
                className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#FA5252] transition"
              >
                + New Post
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-neutral-600 hover:text-neutral-900"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-neutral-200 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === "posts"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === "settings"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Theme Settings
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Blog Theme Settings</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Adjust the global appearance of your blog posts. Changes apply to all posts.
            </p>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium mb-2">Body Font Size</label>
                <div className="flex gap-2">
                  {(["small", "base", "large"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setBlogTheme({ ...blogTheme, fontSize: size })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        blogTheme.fontSize === size
                          ? "bg-[#FF6B6B] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {size === "small" ? "Small (14px)" : size === "base" ? "Medium (15px)" : "Large (17px)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-sm font-medium mb-2">Line Height</label>
                <div className="flex gap-2">
                  {(["tight", "normal", "relaxed"] as const).map((height) => (
                    <button
                      key={height}
                      onClick={() => setBlogTheme({ ...blogTheme, lineHeight: height })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        blogTheme.lineHeight === height
                          ? "bg-[#FF6B6B] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {height === "tight" ? "Tight (1.5)" : height === "normal" ? "Normal (1.7)" : "Relaxed (1.9)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Width */}
              <div>
                <label className="block text-sm font-medium mb-2">Content Width</label>
                <div className="flex gap-2">
                  {(["xl", "2xl", "3xl"] as const).map((width) => (
                    <button
                      key={width}
                      onClick={() => setBlogTheme({ ...blogTheme, maxWidth: width })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        blogTheme.maxWidth === width
                          ? "bg-[#FF6B6B] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {width === "xl" ? "Narrow" : width === "2xl" ? "Medium" : "Wide"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heading Size */}
              <div>
                <label className="block text-sm font-medium mb-2">Heading Size</label>
                <div className="flex gap-2">
                  {(["small", "normal", "large"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setBlogTheme({ ...blogTheme, headingSize: size })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        blogTheme.headingSize === size
                          ? "bg-[#FF6B6B] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {size === "small" ? "Compact" : size === "normal" ? "Normal" : "Large"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paragraph Spacing */}
              <div>
                <label className="block text-sm font-medium mb-2">Paragraph Spacing</label>
                <div className="flex gap-2">
                  {(["tight", "normal", "relaxed"] as const).map((spacing) => (
                    <button
                      key={spacing}
                      onClick={() => setBlogTheme({ ...blogTheme, paragraphSpacing: spacing })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        blogTheme.paragraphSpacing === spacing
                          ? "bg-[#FF6B6B] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {spacing === "tight" ? "Compact" : spacing === "normal" ? "Normal" : "Spacious"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t">
                <button
                  onClick={saveThemeSettings}
                  disabled={savingTheme}
                  className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FA5252] transition disabled:opacity-50"
                >
                  {savingTheme ? "Saving..." : "Save Theme Settings"}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4 text-neutral-500">Preview</h3>
              <div 
                className="p-6 bg-neutral-50 rounded-lg prose"
                style={{
                  fontSize: blogTheme.fontSize === "small" ? "14px" : blogTheme.fontSize === "base" ? "15px" : "17px",
                  lineHeight: blogTheme.lineHeight === "tight" ? 1.5 : blogTheme.lineHeight === "normal" ? 1.7 : 1.9,
                  maxWidth: blogTheme.maxWidth === "xl" ? "36rem" : blogTheme.maxWidth === "2xl" ? "42rem" : "48rem",
                }}
              >
                <h2 style={{
                  fontSize: blogTheme.headingSize === "small" ? "1.125rem" : blogTheme.headingSize === "normal" ? "1.25rem" : "1.5rem",
                }}>
                  Sample Heading
                </h2>
                <p style={{
                  marginBottom: blogTheme.paragraphSpacing === "tight" ? "1rem" : blogTheme.paragraphSpacing === "normal" ? "1.25rem" : "1.75rem",
                }}>
                  This is a sample paragraph to preview how your blog content will look with the current theme settings. The text size, line height, and spacing all affect readability.
                </p>
                <p>
                  Another paragraph follows to show the spacing between content blocks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <span className="text-4xl mb-4 block">📝</span>
                <p className="text-neutral-600 mb-4">No blog posts yet</p>
                <button
                  onClick={startNewPost}
                  className="text-[#FF6B6B] font-semibold hover:underline"
                >
                  Create your first post →
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Title</th>
                    <th className="text-left px-6 py-4 font-semibold">Status</th>
                    <th className="text-left px-6 py-4 font-semibold">Date</th>
                    <th className="text-right px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-neutral-500">/blog/{post.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => editPost(post)}
                          className="text-[#FF6B6B] hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-neutral-500">
          <a href="/blog" target="_blank" className="text-[#FF6B6B] hover:underline">
            View live blog →
          </a>
        </div>
      </div>
    </div>
  );
}
