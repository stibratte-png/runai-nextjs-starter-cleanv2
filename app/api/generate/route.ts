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
Write a practical running article.

Topic: ${topic}
Category: ${category}
Target length: ~${words} words

Return a JSON object with fields:
- title (string)
- body (string, markdown/plain text ok)
- category ("Training" | "Gear" | "Nutrition" | "Injury Prevention")
`

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: prompt,
        // Use the newer hint for JSON output (no 'modalities', no 'response_format')
        text: { format: 'json' },
      }),
    })

    if (!r.ok) {
      const text = await r.text()
      return new Response(JSON.stringify({ error: `OpenAI error: ${text}` }), { status: 500 })
    }

    const data = await r.json()

    // Prefer convenience; fall back to structured path
    const jsonText =
      data.output_text ??
      data?.output?.[0]?.content?.[0]?.text ??
      '{}'

    const obj = JSON.parse(jsonText || '{}')

    const article = {
      title: obj.title || topic,
      body: obj.body || 'No content generated.',
      category: (obj.category || category) as GenReq['category'],
      date: new Date().toISOString().slice(0, 10),
    }

    return new Response(JSON.stringify(article), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error' }), { status: 500 })
  }
}
