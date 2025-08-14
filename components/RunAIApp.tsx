'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Settings } from 'lucide-react'
// ---- Seed article types + data ----
type Article = {
  title: string
  body: string
  category: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  date: string
}

const SEED_ARTICLES: Article[] = [
  {
    title: 'Build Endurance Safely: A 6-Week Base Plan',
    category: 'Training',
    date: new Date().toISOString().slice(0,10),
    body:
      `A simple base phase helps you handle more training later without burnout. 
      
      • Weeks 1–2: 3–4 easy runs (30–45 min). Add 6×100 m relaxed strides twice/week. 
      • Weeks 3–4: One longer run (50–70 min) + 2 easy days. Keep effort conversational. 
      • Weeks 5–6: Long run 70–90 min. Add 6×1 min steady pickups mid-run. 
      
      Recovery cues: poor sleep, heavy legs, elevated morning HR → cut volume 30% for 5–7 days.`
  },
  {
    title: 'Best Budget Running Shoes (2025)',
    category: 'Gear',
    date: new Date().toISOString().slice(0,10),
    body:
      `Looking for value? Prioritize midsole durability and fit. 
      
      Top picks under $120:
      • Nike Pegasus — versatile daily trainer.
      • Brooks Launch — firm, snappy feel for uptempo.
      • Saucony Ride — balanced cushioning for most runners.
      
      Tip: Replace at ~500–700 km; rotate two pairs to reduce injury risk.`
  },
  {
    title: 'Fueling a Half Marathon: What to Eat & When',
    category: 'Nutrition',
    date: new Date().toISOString().slice(0,10),
    body:
      `Carbs drive performance. 
      
      • 24–48h before: focus on carbs (rice, pasta, bread), normal salt, avoid new foods.
      • Breakfast (2–3h pre-start): 2–3 g/kg carbs (toast + jam, oatmeal + banana).
      • During race: 30–60 g carbs/hour via gels/chews + small sips of water.
      
      Practice fueling on long runs to avoid GI surprises.`
  },
  {
    title: 'Stop Shin Splints Before They Start',
    category: 'Injury Prevention',
    date: new Date().toISOString().slice(0,10),
    body:
      `Shin pain usually comes from load spikes and weak calves. 
      
      Do 2–3×/week:
      • Eccentric calf raises 3×12
      • Toe raises 3×15
      • Single-leg balance 3×30s
      
      Progress only one variable at a time: distance, intensity, or frequency.`
  },
  {
    title: 'Interval Workouts That Actually Make You Faster',
    category: 'Training',
    date: new Date().toISOString().slice(0,10),
    body:
      `Use two proven sessions and progress slowly:
      
      • 6×3 min @ 5K–10K effort, 2 min easy jog.
      • 12×400 m @ 3–5K effort, 200 m jog.
      
      Warm up 10–15 min easy + 4×20 s strides; cool down 10 min easy. 
      Keep easy days truly easy so quality stays high.`
  },
]

const ENABLE_ADMIN = process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true'

export default function RunAIApp() {
  const [admin, setAdmin] = useState(false)
  const [layoutCfg, setLayoutCfg] = useState({ density: 'comfortable' })
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES)
  const [filters, setFilters] = useState({ q: '' })

  // Safer mapping for density classes
  const densityGap = useMemo(
    () =>
      (
        {
          compact: 'gap-3',
          spacious: 'gap-8',
          comfortable: 'gap-5',
        } as const
      )[layoutCfg.density as 'compact' | 'spacious' | 'comfortable'] || 'gap-5',
    [layoutCfg.density]
  )

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q)
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
            Practical guidance for runners — covering workouts, shoes, watches, fueling, and injury prevention.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className={`flex-1 max-w-6xl mx-auto p-4 ${densityGap}`}>
        {filtered.length === 0 && <div>No articles found.</div>}
        {filtered.map((article, idx) => (
          <article key={idx} className="p-4 bg-white/5 rounded-xl">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.body}</p>
          </article>
        ))}
      </main>

      {/* Admin Panel */}
      {ENABLE_ADMIN && admin && (
        <aside className="fixed bottom-0 right-0 w-full md:w-96 bg-black/80 p-4 border-t border-white/10">
          <h3 className="font-semibold mb-2">Admin Panel</h3>
          {/* Admin panel contents go here */}
        </aside>
      )}
    </div>
  )
}