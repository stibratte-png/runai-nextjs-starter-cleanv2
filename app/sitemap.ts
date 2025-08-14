import type { MetadataRoute } from 'next'
import { getArticles } from '@/data/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || 'https://runai.example.com'
  const items = (await getArticles()).map(a => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  return [{ url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }, ...items]
}
