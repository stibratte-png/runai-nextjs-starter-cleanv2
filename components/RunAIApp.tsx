'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Settings } from 'lucide-react'

const ENABLE_ADMIN = process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true'

export default function RunAIApp() {
  const [admin, setAdmin] = useState(false)
  const [layoutCfg, setLayoutCfg] = useState({ density: 'comfortable' })
  const [articles, setArticles] = useState<any[]>([])
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