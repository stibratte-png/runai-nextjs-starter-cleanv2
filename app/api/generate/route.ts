export const runtime = 'edge' // rask og rimelig

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
Write a helpful, practical running article.

Topic: ${topic}
Category: ${category}
Target length: about ${words} words

Return a JSON object with exactly these fields:
- title (string)
- body (string, markdown or plain text allowed)
- category (one of Training, Gear, Nutrition, Injury Prevention)
`

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        response_format: { type: 'json_object' },
        input: prompt,
      }),
    })

    if (!r.ok) {
      const text = await r.text()
      return new Response(JSON.stringify({ error: `OpenAI error: ${text}` }), { status: 500 })
    }

    const data = await r.json()
    // Henter JSON-tekst fra Responses API
    const jsonText =
      data?.output?.[0]?.content?.[0]?.text ??
      data?.choices?.[0]?.message?.content ?? // fallback hvis API endres
      '{}'

    const obj = JSON.parse(jsonText || '{}')

    const article = {
      title: obj.title || topic,
      body: obj.body || 'No content generated.',
      category: obj.category || category,
      date: new Date().toISOString().slice(0, 10),
    }

    return new Response(JSON.stringify(article), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error' }), { status: 500 })
  }
}
