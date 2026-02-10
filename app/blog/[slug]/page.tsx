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
  // This is a simple renderer - for production you might want a proper markdown library
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gim, '<hr />')
    // Line breaks to paragraphs
    .split('\n\n')
    .map(para => {
      if (para.startsWith('<h') || para.startsWith('<li') || para.startsWith('<blockquote') || para.startsWith('<hr')) {
        return para;
      }
      if (para.trim()) {
        return `<p>${para.replace(/\n/g, '<br />')}</p>`;
      }
      return '';
    })
    .join('\n');

  // Wrap consecutive <li> items in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');

  return html;
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
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

      {/* Article */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-[#FF6B6B] transition mb-8"
          >
            <span>←</span> Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-sm text-neutral-500">
                {post.published_at && new Date(post.published_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              {post.author && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className="text-sm text-neutral-500">
                    By {post.author}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#FFF5F5] text-[#FF6B6B] text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-[2/1] relative rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              Ready to find the perfect gift?
            </h3>
            <p className="text-white/80 mb-6">
              Join the waitlist and be the first to try Gifted.
            </p>
            <Link
              href="/#waitlist"
              className="inline-block bg-white text-[#FF6B6B] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
            >
              Join the Waitlist
            </Link>
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
