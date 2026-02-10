import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, BlogPost } from "@/lib/supabase";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found - Gifted" };
  }

  return {
    title: post.seo_title || `${post.title} | Gifted Blog`,
    description: post.seo_description || post.excerpt || `Read ${post.title} on the Gifted blog.`,
    keywords: post.seo_keywords || post.tags,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author],
      images: post.cover_image ? [post.cover_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

// Simple markdown-like rendering (converts basic markdown to HTML)
function renderContent(content: string) {
  let html = content
    // Headers - add section wrapper for spacing
    .replace(/^### (.*$)/gim, '</section><section class="content-section"><h3>$1</h3>')
    .replace(/^## (.*$)/gim, '</section><section class="content-section"><h2>$1</h2>')
    .replace(/^# (.*$)/gim, '</section><section class="content-section"><h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Images - with figure wrapper
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure><img src="$2" alt="$1" loading="lazy" /><figcaption>$1</figcaption></figure>')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gim, '<hr />')
    // Line breaks to paragraphs
    .split('\n\n')
    .map(para => {
      if (para.startsWith('<') || para.startsWith('</')) {
        return para;
      }
      if (para.trim()) {
        return `<p>${para.replace(/\n/g, ' ')}</p>`;
      }
      return '';
    })
    .join('\n');

  // Wrap consecutive <li> items in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Clean up empty sections
  html = html.replace(/<section class="content-section"><\/section>/g, '');
  html = '<section class="content-section">' + html + '</section>';

  return html;
}

// Calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = renderContent(post.content);
  const readingTime = getReadingTime(post.content);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation - transparent on hero */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="Gifted" width={40} height={40} />
            <span className="text-xl font-bold">
              <span className="text-[#FF6B6B]">G</span>ifted
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-neutral-600 hover:text-[#FF6B6B] transition"
            >
              Blog
            </Link>
            <Link href="/#waitlist" className="btn-primary text-sm">
              Join Waitlist
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Cover Image */}
      <header className="pt-20">
        {post.cover_image ? (
          <div className="relative h-[50vh] min-h-[400px] max-h-[500px]">
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-3xl mx-auto px-6 pb-12 w-full">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6 text-sm"
                >
                  <span>←</span> Back to Blog
                </Link>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <time>
                    {post.published_at && new Date(post.published_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                  {post.author && (
                    <>
                      <span>•</span>
                      <span>By {post.author}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Fallback header without image
          <div className="pt-12 pb-8 px-6 bg-gradient-to-br from-[#FF6B6B] to-[#FA5252]">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6 text-sm"
              >
                <span>←</span> Back to Blog
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <time>
                  {post.published_at && new Date(post.published_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="relative">
        <div className="max-w-2xl mx-auto px-6">
          {/* Top CTA Banner */}
          <div className="my-8 p-4 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-700">
              <span className="font-semibold">🎁 Looking for gift ideas?</span> Gifted app makes it easy.
            </p>
            <Link
              href="/#signup"
              className="text-sm font-semibold text-[#FF6B6B] hover:text-[#FA5252] whitespace-nowrap"
            >
              Get Early Access →
            </Link>
          </div>

          {/* Excerpt/Intro */}
          {post.excerpt && (
            <div className="py-10 border-b border-neutral-200">
              <p className="text-xl text-neutral-600 leading-relaxed font-light">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div
            className="prose py-12"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Bottom CTA Card */}
          <div className="my-16 p-10 bg-white rounded-3xl shadow-xl text-center border border-neutral-100">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎁</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">
              Stop guessing. Start swiping.
            </h3>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Gifted helps you discover perfect presents in seconds. Join the waitlist for early access.
            </p>
            <Link
              href="/#signup"
              className="inline-block bg-gradient-to-r from-[#FF6B6B] to-[#FA5252] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Get Early Access →
            </Link>
            <p className="text-xs text-neutral-500 mt-4">Free forever. No spam.</p>
          </div>
        </div>
      </article>

      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.cover_image,
            "datePublished": post.published_at,
            "dateModified": post.updated_at,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Gifted",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.thegiftedapp.com/logo-icon.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.thegiftedapp.com/blog/${post.slug}`
            }
          })
        }}
      />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.svg" alt="Gifted" width={32} height={32} />
              <span className="font-bold">
                <span className="text-[#FF6B6B]">G</span>ifted
              </span>
            </Link>

            <div className="flex gap-8 text-sm text-neutral-600">
              <Link href="/blog" className="hover:text-[#FF6B6B] transition">
                Blog
              </Link>
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Privacy
              </a>
              <a href="#" className="hover:text-[#FF6B6B] transition">
                Terms
              </a>
              <a
                href="mailto:hello@gifted.app"
                className="hover:text-[#FF6B6B] transition"
              >
                Contact
              </a>
            </div>

            <p className="text-sm text-neutral-500">
              © 2026 Gifted. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
