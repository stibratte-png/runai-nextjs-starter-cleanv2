import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'
export async function POST(req: NextRequest) {
  const { topic, tone, targetKw, words } = await req.json()
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 })
  }
  const prompt = `Write an English article about ${topic} for runners.
Tone: ${tone}
Target keyword (SEO): ${targetKw}
Structure: title, intro, 4–6 subheadings with practical tips, bullet lists where it makes sense, and a conclusion.
Return JSON with fields: title, summary, html (the article body as simple HTML), category, tags (array), heroImage (URL).
Words: about ${words}`
  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: 'gpt-4.1-mini', input: prompt, response_format: { type: 'json_object' } }),
  })
  if (!r.ok) {
    const t = await r.text()
    return NextResponse.json({ error: 'LLM call failed', details: t }, { status: 500 })
  }
  const data = await r.json() as any
  const txt = data.output?.[0]?.content?.[0]?.text || '{}'
  let obj: any = {}; try { obj = JSON.parse(txt) } catch {}
  const article = {
    id: Math.random().toString(36).slice(2),
    title: obj.title ?? `${topic} – complete guide for runners`,
    slug: (obj.title ?? topic).toLowerCase().replace(/\s+/g, '-'),
    heroImage: obj.heroImage ?? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1920&auto=format&fit=crop',
    category: obj.category ?? 'Training',
    tags: obj.tags ?? [targetKw],
    date: new Date().toISOString().slice(0,10),
    summary: obj.summary ?? `A practical walkthrough of ${topic} focused on "${targetKw}".`,
    content: (obj.html ?? '<p>Coming soon...</p>').replaceAll('<strong>', '**').replaceAll('</strong>', '**'),
    readMinutes: Math.max(4, Math.round(((obj.html || '').split(/\s+/).length || 800) / 180)),
  }
  return NextResponse.json(article)
}
