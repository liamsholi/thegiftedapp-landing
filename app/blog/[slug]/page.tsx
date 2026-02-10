import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getBlogTheme, BlogPost, BlogTheme } from "@/lib/supabase";

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

// Improved markdown rendering with better list handling
function renderContent(content: string) {
  // First, normalize line endings
  let text = content.replace(/\r\n/g, '\n');
  
  // Split into lines for processing
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if line starts with "- " or "* " (list item)
    const listMatch = line.match(/^[\-\*]\s+(.+)$/);
    
    // Check if line is a bold item that should be a list (pattern: **Bold text** followed by description)
    const boldListMatch = line.match(/^\*\*([^*]+)\*\*[:\s]*(.*)$/);
    
    if (listMatch) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(`<li>${processInlineMarkdown(listMatch[1])}</li>`);
    } else if (boldListMatch && !line.startsWith('#')) {
      // Convert bold-starting lines to proper list items
      if (!inList) {
        inList = true;
        listItems = [];
      }
      const title = boldListMatch[1];
      const desc = boldListMatch[2] ? ` ${processInlineMarkdown(boldListMatch[2])}` : '';
      listItems.push(`<li><strong>${title}</strong>${desc}</li>`);
    } else {
      // Close any open list
      if (inList && listItems.length > 0) {
        processedLines.push(`<ul>${listItems.join('')}</ul>`);
        listItems = [];
        inList = false;
      }
      
      // Process the line
      if (line.match(/^###\s+(.+)$/)) {
        const match = line.match(/^###\s+(.+)$/);
        processedLines.push(`<h3>${match![1]}</h3>`);
      } else if (line.match(/^##\s+(.+)$/)) {
        const match = line.match(/^##\s+(.+)$/);
        processedLines.push(`<h2>${match![1]}</h2>`);
      } else if (line.match(/^#\s+(.+)$/)) {
        const match = line.match(/^#\s+(.+)$/);
        processedLines.push(`<h1>${match![1]}</h1>`);
      } else if (line.match(/^>\s*(.+)$/)) {
        const match = line.match(/^>\s*(.+)$/);
        processedLines.push(`<blockquote>${processInlineMarkdown(match![1])}</blockquote>`);
      } else if (line.match(/^---$/)) {
        processedLines.push('<hr />');
      } else if (line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)) {
        const match = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        processedLines.push(`<figure><img src="${match![2]}" alt="${match![1]}" loading="lazy" /><figcaption>${match![1]}</figcaption></figure>`);
      } else if (line.trim() === '') {
        processedLines.push('');
      } else {
        processedLines.push(`<p>${processInlineMarkdown(line)}</p>`);
      }
    }
  }
  
  // Close any remaining list
  if (inList && listItems.length > 0) {
    processedLines.push(`<ul>${listItems.join('')}</ul>`);
  }
  
  // Join and clean up consecutive empty paragraphs
  let html = processedLines.join('\n');
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/\n+/g, '\n');
  
  return html;
}

// Process inline markdown (bold, italic, links)
function processInlineMarkdown(text: string): string {
  return text
    // Links first (before bold/italic to avoid conflicts)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Inline images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="inline-image" />');
}

// Calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Generate theme-based CSS classes
function getThemeStyles(theme: BlogTheme) {
  const fontSizes = { small: "0.875rem", base: "0.9375rem", large: "1.0625rem" };
  const lineHeights = { tight: 1.5, normal: 1.7, relaxed: 1.9 };
  const maxWidths = { xl: "36rem", "2xl": "42rem", "3xl": "48rem" };
  const headingSizes = { 
    small: { h1: "1.25rem", h2: "1.125rem", h3: "1rem" },
    normal: { h1: "1.5rem", h2: "1.25rem", h3: "1.0625rem" },
    large: { h1: "1.75rem", h2: "1.5rem", h3: "1.25rem" }
  };
  const paragraphSpacings = { tight: "1rem", normal: "1.25rem", relaxed: "1.75rem" };

  return {
    fontSize: fontSizes[theme.fontSize],
    lineHeight: lineHeights[theme.lineHeight],
    maxWidth: maxWidths[theme.maxWidth],
    headingSizes: headingSizes[theme.headingSize],
    paragraphSpacing: paragraphSpacings[theme.paragraphSpacing],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, theme] = await Promise.all([
    getPostBySlug(slug),
    getBlogTheme()
  ]);

  if (!post) {
    notFound();
  }

  const contentHtml = renderContent(post.content);
  const readingTime = getReadingTime(post.content);
  const themeStyles = getThemeStyles(theme);

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
            style={{
              fontSize: themeStyles.fontSize,
              lineHeight: themeStyles.lineHeight,
              // @ts-expect-error CSS custom properties
              '--heading-h1': themeStyles.headingSizes.h1,
              '--heading-h2': themeStyles.headingSizes.h2,
              '--heading-h3': themeStyles.headingSizes.h3,
              '--paragraph-spacing': themeStyles.paragraphSpacing,
            }}
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
