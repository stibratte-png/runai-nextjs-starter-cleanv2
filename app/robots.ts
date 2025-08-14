import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: (process.env.SITE_URL || 'https://runai.example.com') + '/sitemap.xml'
  }
}
