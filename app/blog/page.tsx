import Link from "next/link";
import Image from "next/image";
import { getAllPublishedPosts, BlogPost } from "@/lib/supabase";

export const metadata = {
  title: "Gift Ideas Blog | Gifted - Tips, Guides & Inspiration",
  description: "Discover the best gift ideas, buying guides, and inspiration for every occasion. Expert tips to help you find the perfect present.",
  keywords: ["gift ideas", "gift guide", "present ideas", "birthday gifts", "christmas gifts", "gift inspiration"],
  openGraph: {
    title: "Gift Ideas Blog | Gifted",
    description: "Discover the best gift ideas, buying guides, and inspiration for every occasion.",
    type: "website",
  },
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPublishedPosts();

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
            <Link href="/blog" className="text-[#FF6B6B] font-medium">
              Blog
            </Link>
            <Link href="/#waitlist" className="btn-primary text-sm">
              Join Waitlist
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="gradient-text">Gifted</span> Blog
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Gift-giving tips, inspiration, and ideas to help you find the
            perfect present for every occasion.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-2xl">
              <span className="text-6xl mb-4 block">📝</span>
              <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-neutral-600">
                We&apos;re working on some great content. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post: BlogPost) => (
                <article key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                  >
                    {post.cover_image && (
                      <div className="aspect-[2/1] relative bg-neutral-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-sm text-neutral-500">
                          {post.published_at && new Date(post.published_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span className="text-neutral-300">•</span>
                            <span className="text-sm text-[#FF6B6B]">
                              {post.tags[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-[#FF6B6B] transition">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-neutral-600">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Gifted Blog",
            "description": "Gift-giving tips, inspiration, and ideas",
            "url": "https://www.thegiftedapp.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Gifted",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.thegiftedapp.com/logo-icon.svg"
              }
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
