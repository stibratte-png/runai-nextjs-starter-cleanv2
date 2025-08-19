// /app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SEED_ARTICLES, slugify } from '@/lib/seed'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || 'https://runai.example.com'

  const cats = ['training', 'gear', 'nutrition', 'injury-prevention'].map((slug) => ({
    url: `${base}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const articles = SEED_ARTICLES.map((a) => ({
    url: `${base}/articles/${slugify(a.title)}`,
    lastModified: new Date(a.date ?? Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...cats,
    ...articles,
  ]
}
