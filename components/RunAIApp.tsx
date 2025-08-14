'use client'
import React, { useMemo, useState } from 'react'
import { Settings, X } from 'lucide-react'

type Article = {
  title: string
  body: string
  category: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  date: string
  image?: string
  slug?: string
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function excerpt(text: string, words = 40) {
  const arr = text.trim().split(/\s+/)
  return arr.length <= words ? text : arr.slice(0, words).join(' ') + '…'
}

const SEED_ARTICLES: Article[] = [
  {
    title: 'Build Endurance Safely: A 6-Week Base Plan',
    category: 'Training',
    date: new Date().toISOString().slice(0, 10),
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop',
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
    date: new Date().toISOString().slice(0, 10),
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
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
    date: new Date().toISOString().slice(0, 10),
    image: 'https://images.unsplash.com/photo-1526401485004-2fda9f4d7d2a?q=80&w=1600&auto=format&fit=crop',
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
    date: new Date().toISOString().slice(0, 10),
    image: 'https://images.unsplash.com/photo-1518617840859-acd542e13d53?q=80&w=1600&auto=format&fit=crop',
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
    date: new Date().toISOString().slice(0, 10),
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop',
    body:
      `Use two proven sessions and progress slowly:

• 6×3 min @ 5K–10K effort, 2 min easy jog.
• 12×400 m @ 3–5K effort, 200 m jog.

Warm up 10–15 min easy + 4×20 s strides; cool down 10 min easy.
Keep easy days truly easy so quality stays high.`
  },
].map(a => ({ ...a, slug: slugify(a.title) }))

const ENABLE_ADMIN = process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true'

export default function RunAIApp() {
  const [admin, setAdmin] = useState(false)
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<'All' | Article['category']>('All')
  const [selected, setSelected] = useState<Article | null>(null)

  // Generate AI article (unchanged behavior, now with slug + image fallback)
  const [genTopic, setGenTopic] = useState('Marathon pacing for beginners')
  const [genCategory, setGenCategory] = useState<Article['category']>('Training')
  const [genBusy, setGenBusy] = useState(false)

  async function generateArticle() {
    try {
      setGenBusy(true)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: genTopic, category: genCategory, words: 900 }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data?.error || 'Failed to generate'); return }

      const fallbackImage = `https://source.unsplash.com/featured/1600x900/?running,${encodeURIComponent(genTopic || data.title || 'run')}`

      const article: Article = {
        title: data.title,
        body: data.body,
        category: data.category,
        date: data.date,
        image: data.image || fallbackImage,
        slug: slugify(data.title),
      }
      setArticles(prev => [article, ...prev])
      setGenTopic('')
    } catch (e: any) {
      alert(e?.message || 'Network error')
    } finally {
      setGenBusy(false)
    }
  }

  // Filtering + search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return articles.filter(a => {
      const okCat = category === 'All' ? true : a.category === category
      const okSearch = !term || a.title.toLowerCase().includes(term) || a.body.toLowerCase().includes(term)
      return okCat && okSearch
    })
  }, [articles, q, category])

  // UI
  const cats: Array<'All' | Article['category']> = ['All', 'Training', 'Gear', 'Nutrition', 'Injury Prevention']

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / topbar */}
      <div className="bg-black/70 backdrop-blur sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <div className="font-semibold text-lg tracking-tight">RunAI</div>
            <div className="text-xs opacity-70">Training • Gear • Nutrition</div>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Search articles…"
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            {ENABLE_ADMIN && (
              <button
                onClick={() => setAdmin(v => !v)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
              >
                <Settings size={16}/> Admin
              </button>
            )}
          </div>
        </div>

        {/* Category menu */}
        <div className="max-w-6xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full border ${category === c ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[var(--primary)] text-black py-8">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Smart running tips, training plans & gear picks
          </h1>
          <p className="opacity-90 max-w-prose mx-auto">
            Practical guidance for runners — workouts, shoes, watches, fueling and injury prevention.
          </p>
        </div>
      </section>

      {/* Feed: PREVIEW CARDS only */}
      <main className="flex-1 max-w-6xl mx-auto p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && <div className="opacity-80">No articles found.</div>}
        {filtered.map(a => (
          <button
            key={a.slug}
            onClick={() => setSelected(a)}
            className="text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl overflow-hidden"
          >
            {a.image && (
              <img src={a.image} alt={a.title} className="w-full h-44 object-cover" loading="lazy" />
            )}
            <div className="p-3 space-y-1">
              <div className="text-xs opacity-70">{a.category} • {a.date}</div>
              <h2 className="font-semibold">{a.title}</h2>
              <p className="text-sm opacity-90">{excerpt(a.body, 28)}</p>
            </div>
          </button>
        ))}
      </main>

      {/* FULL ARTICLE VIEW (reader-panel) */}
      {selected && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur">
          <div className="absolute inset-0 md:inset-y-6 md:left-1/2 md:right-6 md:translate-x-[-10%]">
            <article className="bg-[#0b0b0b] h-full md:h-auto md:max-h-full overflow-y-auto rounded-none md:rounded-2xl border border-white/10">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 sticky top-0 bg-[#0b0b0b]">
                <div className="text-sm opacity-80">{selected.category} • {selected.date}</div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-white/10"><X size={18}/></button>
              </div>
              {selected.image && <img src={selected.image} alt={selected.title} className="w-full max-h-[45vh] object-cover" />}
              <div className="px-4 md:px-6 py-6 space-y-4">
                <h1 className="text-2xl md:text-3xl font-semibold">{selected.title}</h1>
                <div className="whitespace-pre-line leading-relaxed">{selected.body}</div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* Admin — generate new articles */}
      {ENABLE_ADMIN && admin && (
        <aside className="fixed bottom-0 right-0 w-full md:w-[420px] bg-black/90 p-4 border-t border-white/10 backdrop-blur z-[70]">
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
              onChange={(e) => setGenCategory(e.target.value as Article['category'])}
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
              Tip: Be specific — “5K under 25 minutes plan”, “Shin splints rehab”, “Budget carbon plate shoes”.
            </p>
          </div>
        </aside>
      )}
    </div>
  )
}
