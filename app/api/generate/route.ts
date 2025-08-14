// app/api/generate/route.ts
export const runtime = 'edge'

type GenReq = {
  topic: string
  category?: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  words?: number
}

export async function POST(req: Request) {
  try {
    const { topic, category = 'Training', words = 800 } = (await req.json()) as GenReq

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }), { status: 500 })
    }

    const prompt = `
Return ONLY JSON (no prose). Fields:
- title (string)
- body (string)
- category ("Training" | "Gear" | "Nutrition" | "Injury Prevention")
- image (string, direct URL to a royalty-free photo suitable for the topic, preferably from https://source.unsplash.com or https://images.pexels.com)

Write a practical running article.

Topic: ${topic}
Category: ${category}
Target length: ~${words} words
`

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: prompt, // no special format flags; we'll parse the text
      }),
    })

    if (!r.ok) {
      const text = await r.text()
      return new Response(JSON.stringify({ error: `OpenAI error: ${text}` }), { status: 500 })
    }

    const data = await r.json()

    let raw = data.output_text ?? data?.output?.[0]?.content?.[0]?.text ?? ''
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    if (start !== -1 && end !== -1 && end > start) raw = raw.slice(start, end + 1)

    let obj: any = {}
    try {
      obj = JSON.parse(raw)
    } catch {
      obj = { title: topic, body: raw || 'No content generated.', category }
    }

    const article = {
      title: obj.title || topic,
      body: obj.body || 'No content generated.',
      category: (obj.category || category) as GenReq['category'],
      date: new Date().toISOString().slice(0, 10),
      image: typeof obj.image === 'string' ? obj.image : undefined,
    }

    return new Response(JSON.stringify(article), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error' }), { status: 500 })
  }
}
