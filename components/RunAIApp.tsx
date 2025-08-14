'use client'
import React, { useMemo, useState } from 'react'
import { Settings } from 'lucide-react'

type Article = {
  title: string
  body: string
  category: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  date: string
  image?: string
}

const SEED_ARTICLES: Article[] = [
  {
    title: 'Build Endurance Safely: A 6-Week Base Plan',
    category: 'Training',
    date: new Date().toISOString().slice(0, 10),
    image:
      'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop',
    body: `A simple base phase helps you handle more training later without burnout.
• Weeks 1–2: 3–4 easy runs (30–45 min). Add 6×100 m relaxed strides twice/week.
• Weeks 3–4: One longer run (50–70 min) + 2 easy days. Keep effort conversational.
• Weeks 5–6: Long run 70–90 min. Add 6×1 min steady pickups mid-run.

Recovery cues: poor sleep, heavy legs, elevated morning HR → cut volume 30% for 5–7 days.`,
  },
  {
    title: 'Best Budget Running Shoes (2025)',
    category: 'Gear',
    date: new Date().toISOString().slice(0, 10),
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
    body: `Looking for value? Prioritize midsole durability and fit.

Top picks under $120:
• Nike Pegasus — versatile daily trainer.
• Brooks Launch — firm, snappy feel for uptempo.
• Saucony Ride — balanced cushioning for most runners.

Tip: Replace at ~500–700 km; rotate two pairs to reduce injury risk.`,
  },
  {
    title: 'Fueling a Half Marathon: What to Eat & When',
    category: 'Nutrition',
    date: new Date().toISOString().slice(0, 10),
    image:
      'https://images.unsplash.com/photo-1526401485004-2fda9f4d7d2a?q=80&w=1600&auto=format&fit=crop',
    body: `Carbs drive performance.

• 24–48h before: focus on carbs (rice, pasta, bread), normal salt, avoid new foods.
• Breakfast (2–3h pre-start): 2–3 g/kg carbs (toast + jam, oatmeal + banana).
• During race: 30–60 g carbs/hour via gels/chews + small sips of water.

Practice fueling on long runs to avoid GI surprises.`,
  },
  {
    title: 'Stop Shin Splints Before They Start',
    category: 'Injury Prevention',
    date: new Date().toISOString().slice(0, 10),
    image:
      'https://images.unsplash.com/photo-1518617840859-acd542e13d53?q=80&w=1600&auto=format&fit=crop',
    body: `Shin pain usually comes from load spikes and weak calves.

Do 2–3×/week:
• Eccentric calf raises 3×12
• Toe raises 3×15
• Single-leg balance 3×30s

Progress only one variable at a time: distance, intensity, or frequency.`,
  },
  {
    title: 'Interval Workouts That Actually Make You Faster',
    category: 'Training',
    date: new Date().toISOString().slice(0, 10),
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop',
    body: `Use two proven sessions and progress slowly:

• 6×3 min @ 5K–10K effort, 2 min easy jog.
• 12×400 m @ 3–5K effort, 200 m jog.

Warm up 10–15 min easy + 4×20 s strides; cool down 10 min easy.
Keep easy days truly easy so quality stays high.`,
  },
]

const ENABLE_ADMIN = process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true'

export default function RunAIApp() {
  const [admin, setAdmin] = useState(false)
  const [layoutCfg] = useState<{ density: 'comfortable' | 'compact' | 'spacious' }>({
    density: 'comfortable',
  })
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES)
  const [filters, setFilters] = useState({ q: '' })

  // --- AI generation state ---
  const [genTopic, setGenTopic] = useState('Marathon pacing for beginners')
  const [genCategory, setGenCategory] =
    useState<Article['category']>('Training')
  const [genBusy, setGenBusy] = useState(false)

  async function generateArticle() {
    try {
      setGenBusy(true)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: genTopic,
          category: genCategory,
          words: 900,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data?.error || 'Failed to generate')
        return
      }

      // fallback if no image is provided by API
      const fallbackImage = `https://source.unsplash.com/featured/1600x900/?running,${encodeURIComponent(
        genTopic || data.title || 'run'
      )}`

      setArticles((prev) => [
        {
          title: data.title,
          body: data.body,
          category: data.category,
          date: data.date,
          image: data.image || fallbackImage,
        },
        ...prev,
      ])
      setGenTopic('')
    } catch (e: any) {
      alert(e?.message || 'Network error')
    } finally {
      setGenBusy(false)
    }
  }

  // density mapping
  const densityGap = useMemo(
    () =>
      (
        {
          compact: 'gap-3',
          spacious: 'gap-8',
          comfortable: 'gap-5',
        } as const
      )[layoutCfg.density] || 'gap-5',
    [layoutCfg.density]
  )

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)
    )
  }, [articles, filters.q])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-black/70 backdrop-blur sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <div className="font-semibold text-lg tracking-tight">RunAI</div>
            <div className="text-xs opacity-70">Training • Gear • Nutrition</div>
          </div>
          <div className="flex gap-3">
            {ENABLE_ADMIN && (
              <button
                onClick={() => setAdmin((v) => !v)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
              >
                <Settings size={16} /> Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[var(--primary)] text-black py-10">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Smart running tips, training plans & gear picks
          </h1>
          <p className="opacity-90 max-w-prose mx-auto">
            Practical guidance for runners — covering workouts, shoes, watches,
            fueling, and injury prevention.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className={`flex-1 max-w-6xl mx-auto p-4 ${densityGap}`}>
        <div className="mb-4 flex items-center gap-2">
          <input
            placeholder="Search articles…"
            className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 flex-1"
            value={filters.q}
            onChange={(e) => setFilters({ q: e.target.value })}
          />
        </div>

        {filtered.length === 0 && <div>No articles found.</div>}
        {filtered.map((article, idx) => (
          <article
            key={idx}
            className="p-4 bg-white/5 rounded-xl space-y-2 overflow-hidden"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg"
                loading="lazy"
              />
            )}
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-xs opacity-70">
              {article.category} • {article.date}
            </p>
            <p className="mt-2 whitespace-pre-line">{article.body}</p>
          </article>
        ))}
      </main>

      {/* Admin Panel */}
      {ENABLE_ADMIN && admin && (
        <aside className="fixed bottom-0 right-0 w-full md:w-[420px] bg-black/90 p-4 border-t border-white/10 backdrop-blur">
          <h3 className="font-semibold mb-3">Admin • Generate article</h3>
          <div className="space-y-3 text-sm">
            <input
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10"
              placeholder="Topic (e.g., 12-week 10K plan)"
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
            />
            <select
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10"
              value={genCategory}
              onChange={(e) =>
                setGenCategory(e.target.value as Article['category'])
              }
            >
              <option>Training</option>
              <option>Gear</option>
              <option>Nutrition</option>
              <option>Injury Prevention</option>
            </select>
            <button
              onClick={generateArticle}
              disabled={genBusy || !genTopic.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
            >
              {genBusy ? 'Generating…' : 'Generate'}
            </button>
            <p className="text-xs opacity-70">
              Tip: Be specific — “5K under 25 minutes plan”, “Shin splints rehab”,
              “Budget carbon plate shoes”.
            </p>
          </div>
        </aside>
      )}
    </div>
  )
}
