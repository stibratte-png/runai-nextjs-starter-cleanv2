'use client'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Settings } from 'lucide-react'
import { Article as SeedArticle, SEED_ARTICLES, slugify } from '@/lib/seed'

type Article = Omit<SeedArticle, 'slug'> & { slug: string }

function excerpt(text: string, words = 40) {
  const arr = text.trim().split(/\s+/)
  return arr.length <= words ? text : arr.slice(0, words).join(' ') + '…'
}

const ENABLE_ADMIN = process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true'

export default function RunAIApp() {
  const [admin, setAdmin] = useState(false)
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES)
  const [q, setQ] = useState('')
  const cats: Array<'All' | Article['category']> = ['All', 'Training', 'Gear', 'Nutrition', 'Injury Prevention']
  const [category, setCategory] = useState<'All' | Article['category']>('All')

  // --- AI generator state ---
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

      // Åpne artikkel med SEO-URL. For nye AI-artikler sender vi innhold via query params
      const u = new URL(window.location.origin + '/articles/' + article.slug)
      u.searchParams.set('t', article.title)
      u.searchParams.set('b', article.body)
      u.searchParams.set('c', article.category)
      u.searchParams.set('d', article.date)
      if (article.image) u.searchParams.set('img', article.image)
      window.location.href = u.toString()
    } catch (e: any) {
      alert(e?.message || 'Network error')
    } finally {
      setGenBusy(false)
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return articles.filter(a => {
      const okCat = category === 'All' ? true : a.category === category
      const okSearch = !term || a.title.toLowerCase().includes(term) || a.body.toLowerCase().includes(term)
      return okCat && okSearch
    })
  }, [articles, q, category])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
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

        {/* Kategori-meny */}
        <div className="max-w-6xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          {cats.map(c => {
            const isActive = category === c
            const href =
              c === 'All'
                ? '/'
                : '/category/' +
                  (c === 'Injury Prevention' ? 'injury-prevention' : c.toLowerCase())
            return (
              <Link
                key={c}
                href={href}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full border ${isActive ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                {c}
              </Link>
            )
          })}
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

      {/* Preview feed */}
      <main className="flex-1 max-w-6xl mx-auto p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && <div className="opacity-80">No articles found.</div>}
        {filtered.map(a => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
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
          </Link>
        ))}
      </main>

      {/* Admin generator */}
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
