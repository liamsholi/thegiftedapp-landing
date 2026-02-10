import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Blog post queries
export async function getAllPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      mainImage,
      categories,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `);
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      mainImage,
      body,
      categories,
      seoTitle,
      seoDescription,
      seoKeywords,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `, { slug });
}

export async function getAllPostSlugs() {
  return sanityClient.fetch(`
    *[_type == "post"] {
      "slug": slug.current
    }
  `);
}
