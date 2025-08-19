// /app/feed.xml/route.ts
import { NextResponse } from 'next/server'
import { SEED_ARTICLES, slugify } from '@/lib/seed'

export const runtime = 'edge'

function xmlEscape(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function GET() {
  const base = process.env.SITE_URL || 'https://runai.example.com'
  const now = new Date().toUTCString()

  const items = SEED_ARTICLES.map((a) => {
    const slug = slugify(a.title)
    const link = `${base}/articles/${slug}`
    const desc = xmlEscape(a.body.slice(0, 280)) // kort utdrag
    const pubDate = new Date(a.date || Date.now()).toUTCString()
    return `
      <item>
        <title>${xmlEscape(a.title)}</title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        <category>${xmlEscape(a.category)}</category>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${desc}]]></description>
      </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RunAI — Articles</title>
    <link>${base}</link>
    <description>Running training plans, gear recommendations, nutrition and injury-prevention advice.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    status: 200,
    headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' },
  })
}
