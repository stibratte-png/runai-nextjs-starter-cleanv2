import { NextResponse } from 'next/server'
import { getArticles } from '@/data/articles'
export const runtime = 'nodejs'
export async function GET() {
  const site = process.env.SITE_URL || 'https://runai.example.com'
  const items = await getArticles()
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>RunAI Feed</title>
    <link>${site}</link>
    <description>Latest AI-generated running articles</description>
    ${items.map(i => `
    <item>
      <title><![CDATA[${i.title}]]></title>
      <link>${site}/articles/${i.slug}</link>
      <guid isPermaLink="true">${site}/articles/${i.slug}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[${i.summary}]]></description>
    </item>`).join('')}
  </channel>
</rss>`
  return new NextResponse(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
