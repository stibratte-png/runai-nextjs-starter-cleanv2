'use client'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Newspaper, Settings, Wand2, DollarSign, Calendar as CalendarIcon, Filter, BarChart2, ExternalLink, X, Upload } from 'lucide-react'
import { GoogleAd, StickyTopAd, StickyBottomAd } from './Ads'

/* ---- NEW: explicit types to satisfy TS ---- */
type Density = 'comfortable' | 'compact' | 'spacious';
type LayoutKind = 'grid' | 'magazine' | 'timeline';
type LayoutCfg = {
  name: string;
  layout: LayoutKind;
  primary: string;
  background: string;
  cardBg: string;
  text: string;
  accent: string;
  radius: string;
  density: Density;
};
/* ------------------------------------------- */

const randomId = () => Math.random().toString(36).slice(2)

function slugify(str: string) {
  return str.toLowerCase().replace(/å|ä/g, 'a').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}

function formatDate(d = new Date()) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(d)
}

type Article = { id:string,title:string,slug:string,heroImage:string,category:string,tags?:string[],date:string,summary:string,content:string,readMinutes:number }

const initialArticles: Article[] = [{
  id: randomId(),
  title: 'How to build your aerobic base for the fall season',
  slug: 'how-to-build-your-aerobic-base-for-the-fall-season',
  heroImage: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1920&auto=format&fit=crop',
  category: 'Training',
  tags: ['base', 'endurance', 'beginner'],
  date: formatDate(),
  summary: 'A simple 6-week plan to strengthen your base fitness without overtraining.',
  content: `Building an aerobic base is about steady load, low to moderate intensity, and enough sleep.

**Weeks 1–2:** 3–4 sessions in zone 2 (easy conversation pace), 30–45 min. Add 6×100 m strides after 2 of the runs.

**Weeks 3–4:** Increase duration to 45–60 min for 2 runs. Add 6×1 min gentle pickups in zone 3 mid-run.

**Weeks 5–6:** One slightly longer run (70–90 min) + 2–3 easy runs. Keep the pace controlled. Prioritize 7–8 h sleep and 1–2 strength sessions for calves/hamstrings.

**Warning signs:** Dropping motivation, restless sleep, elevated resting HR. Cut volume 30–40% for one week.`,
  readMinutes: 6,
}]

const sampleAffiliate = [
  { title: 'Nike Pegasus 41', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop', price: '$139', url: 'https://www.amazon.com/dp/B0EXAMPLE?tag=YOURTAG-20', pros: ['All-round', 'Durable', 'Stable'] },
  { title: 'Hoka Mach X', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop', price: '$199', url: 'https://www.hoka.com/', pros: ['Light', 'Responsive', 'Daily trainer'] },
  { title: 'Garmin Forerunner 265', img: 'https://images.unsplash.com/photo-1515504452215-20d4c6199dcd?q=80&w=1200&auto=format&fit=crop', price: '$449', url: 'https://www.garmin.com/', pros: ['AMOLED', 'Good battery', 'HRV'] },
]

/* ---- CHANGED: typed defaultLayout ---- */
const defaultLayout: LayoutCfg = {
  name: 'RunAI Standard',
  layout: 'grid',
  primary: '#1e90ff',
  background: '#0b1220',
  cardBg: '#0e1729',
  text: '#e7eefc',
  accent: '#10b981',
  radius: '1.25rem',
  density: 'comfortable',
}

function AdSlot({ slot = 'header' }: { slot?: string }) {
  return (
    <div className="w-full text-center border border-white/10 bg-white/5 rounded-2xl p-2" aria-label={`Ad slot: ${slot}`}>
      <GoogleAd />
    </div>
  )
}

function AffiliateCard({ item }: { item:any }) {
  return (
    <a className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition" href={item.url} target="_blank" rel="nofollow noopener">
      <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
      <div className="p-4 space-y-2 bg-black/20 backdrop-blur">
        <div className="text-lg font-semibold tracking-tight flex items-center gap-2">{item.title} <ExternalLink size={16} className="opacity-70" /></div>
        <div className="text-sm opacity-80">{item.price}</div>
        <ul className="text-xs opacity-90 flex gap-2 flex-wrap">{item.pros.map((p:string) => (<li key={p} className="px-2 py-1 rounded-full bg-white/10 border border-white/10">{p}</li>))}</ul>
      </div>
    </a>
  )
}

function ArticleCard({ a, onOpen }: { a:Article, onOpen:(a:Article)=>void }) {
  return (
    <motion.button layout onClick={() => onOpen(a)} className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition bg-gradient-to-b from-white/5 to-transparent" whileHover={{ scale: 1.01 }}>
      <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url(${a.heroImage})` }} />
      <div className="p-4 space-y-3">
        <div className="text-xs opacity-70 flex items-center gap-2"><span className="uppercase tracking-widest">{a.category}</span><span>•</span><span>{a.date}</span></div>
        <h3 className="text-xl font-semibold leading-tight">{a.title}</h3>
        <p className="opacity-90 text-sm">{a.summary}</p>
        <div className="flex flex-wrap gap-2 pt-2">{a.tags?.map(t => (<span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">#{t}</span>))}</div>
      </div>
    </motion.button>
  )
}

function ArticleModal({ a, onClose }: { a: Article | null, onClose:()=>void }) {
  if (!a) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4">
      <motion.div layout className="w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-[#0e1729] shadow-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${a.heroImage})` }} />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs opacity-70 uppercase tracking-widest">{a.category} • {a.date}</div>
            <button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><X size={16}/> Close</button>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">{a.title}</h2>
          <p className="opacity-90">{a.summary}</p>
          <AdSlot slot="article-top" />
          <article className="prose prose-invert max-w-none">{a.content.split("\n\n").map((para, idx) => (<p key={idx} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />))}</article>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">{sampleAffiliate.map(item => (<AffiliateCard key={item.title} item={item} />))}</div>
          <AdSlot slot="article-bottom" />
        </div>
      </motion.div>
    </div>
  )
}

export default function RunAIApp() {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [open, setOpen] = useState<Article | null>(null)
  const [admin, setAdmin] = useState(false)
  /* ---- CHANGED: typed layoutCfg state ---- */
  const [layoutCfg, setLayoutCfg] = useState<LayoutCfg>(defaultLayout)
  const [filters, setFilters] = useState({ q:'', cat:'All', tag:'All' })
  const [calendar, setCalendar] = useState<{date:string,title:string,slug:string}[]>([])
  const [serverlessOpen, setServerlessOpen] = useState(false)

  const USE_LOCAL_MOCK = true // change to false after adding OPENAI_API_KEY in Vercel

  /* ---- CHANGED: safe mapping instead of chained ternary ---- */
  const densityGap = useMemo(() => (
    ({ compact: 'gap-3', spacious: 'gap-8', comfortable: 'gap-5' })[layoutCfg.density]
  ), [layoutCfg.density])

  const filtered = useMemo(() => articles.filter(a => {
    const q = filters.q.trim().toLowerCase()
    const okQ = !q || `${a.title} ${a.summary} ${a.tags?.join(' ')}`.toLowerCase().includes(q)
    const okCat = filters.cat === 'All' || a.category === filters.cat
    const okTag = filters.tag === 'All' || (a.tags || []).includes(filters.tag)
    return okQ && okCat && okTag
  }), [articles, filters])

  async function generateArticle({ topic, tone, targetKw, words = 800 }: { topic:string,tone:string,targetKw:string,words?:number }) {
    if (!USE_LOCAL_MOCK) {
      const res = await fetch('/api/generate', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ topic, tone, targetKw, words }) })
      const data = await res.json()
      setArticles(prev => [data, ...prev])
      return
    }
    const title = `${topic} – complete guide for runners`
    const summary = `A practical, ${tone.toLowerCase()} walkthrough of ${topic.toLowerCase()} focused on "${targetKw}".`
    const outline = ['Why this matters', 'How to start (week by week)', 'Common mistakes and how to avoid them', 'Gear that helps', 'Summary and next steps']
    const content = outline.map(h => `**${h}:** ${mockParagraph(topic, tone)}`).join('\n\n')
    const newA: Article = {
      id: randomId(),
      title, slug: slugify(title),
      heroImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1920&auto=format&fit=crop',
      category: ['Training','Gear','Injury Prevention','Nutrition'][Math.floor(Math.random()*4)],
      tags: [targetKw.toLowerCase(), 'running', 'guide'],
      date: formatDate(new Date()), summary, content,
      readMinutes: Math.max(4, Math.round((words || 800) / 180))
    }
    setArticles(prev => [newA, ...prev])
  }

  async function generateLayout({ prompt }: { prompt:string }) {
    const p = (prompt || '').toLowerCase()
    const has = (k:string) => p.includes(k)
    const palette = (has('energy')||has('pace')||has('energi')||has('tempo')) ? { primary:'#f97316', accent:'#22d3ee', background:'#0a0f1c', cardBg:'#0f172a' } :
      (has('natural')||has('trail')||has('naturlig')||has('terreng')) ? { primary:'#10b981', accent:'#a3e635', background:'#08110d', cardBg:'#0b1913' } :
      (has('pro')||has('magazine')||has('proff')||has('magasin')) ? { primary:'#6366f1', accent:'#f59e0b', background:'#0b1220', cardBg:'#0e1729' } :
      { primary:'#1e90ff', accent:'#10b981', background:'#0b1220', cardBg:'#0e1729' }
    const layout: LayoutKind = (has('magazine')||has('magasin')) ? 'magazine' : (has('timeline')||has('time')) ? 'timeline' : 'grid'
    const density: Density = (has('compact')||has('kompakt')) ? 'compact' : (has('airy')||has('luftig')) ? 'spacious' : 'comfortable'
    setLayoutCfg(cfg => ({ ...cfg, name:`AI design: ${prompt.slice(0,30)}`, layout, density, ...palette }))
  }

  function buildCalendar(seedTopic: string) {
    const today = new Date()
    const ideas = [
      '5 mistakes that cost you speed',
      'VO2max intervals – how to nail them',
      'Easy long run: heart rate, pace and duration',
      'How to choose the right running shoes',
      '3 strength workouts for runners',
      'Fartlek: play your way faster',
      'Stay injury-free: calves and Achilles',
      'Fueling before and after workouts',
      'Trail running for beginners',
      'How to build your marathon base',
    ]
    const days = Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(today); d.setDate(d.getDate() + i)
      const title = `${seedTopic}: ${ideas[Math.floor(Math.random()*ideas.length)]}`
      return { date: d.toISOString().slice(0,10), title, slug: slugify(title) }
    })
    setCalendar(days)
  }

  const categories = React.useMemo(() => Array.from(new Set(['All', ...articles.map(a => a.category)])), [articles])
  const tags = React.useMemo(() => Array.from(new Set(['All', ...articles.flatMap(a => a.tags || [])])), [articles])

  return (
    <div style={{ ['--primary' as any]: '#1e90ff', ['--accent' as any]: '#10b981', ['--card' as any]: '#0e1729', ['--text' as any]: '#e7eefc', ['--radius' as any]: '1.25rem' }} className="min-h-screen text-[var(--text)]">
      <StickyTopAd />
      <StickyBottomAd />
      <div className="relative" style={{ background: `radial-gradient(1200px 400px at 10% -20%, #1e90ff33, transparent), linear-gradient(to bottom, #0b1220, #080b15)` }}>
        <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl grid place-items-center bg-[var(--primary)]/20 border border-white/10"><Rocket /></div>
            <div><div className="font-semibold text-lg tracking-tight">RunAI</div><div className="text-xs opacity-70">AI-powered running site</div></div>
          </div>
          <div className="flex items-center gap-2"><button onClick={() => setAdmin(v => !v)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><Settings size={16}/> Admin</button></div>
        </header>
        <main className="max-w-6xl mx-auto px-4 pb-10">
          <section className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Publish running articles automatically – <span className="text-[var(--primary)]">make money</span> with ads and affiliates</h1>
              <p className="opacity-90 max-w-prose">This site lets you generate articles, shape the layout with AI, and publish on a schedule. Replace the ad code and affiliate links—and you're good to go.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">SEO-friendly</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Fast</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Monetization</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--card)] p-4"><AdSlot slot="header-hero" /></div>
          </section>
        </main>
      </div>

      {admin && (
        <div className="max-w-6xl mx-auto px-4 -mt-6 pb-4">
          <div className="rounded-3xl border border-white/10 bg-[var(--card)] p-4 md:p-6 space-y-6">
            <div className="flex items-center gap-3"><Settings /><h2 className="text-xl font-semibold">Admin panel</h2></div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2"><Newspaper size={18} /><h3 className="font-semibold">Generate article</h3></div>
                <ArticleGenerator onGenerate={generateArticle} />
              </div>
              <div className="rounded-2xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2"><Wand2 size={18} /><h3 className="font-semibold">Generate layout</h3></div>
                <LayoutGenerator onGenerate={generateLayout} />
              </div>
              <div className="rounded-2xl border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2"><CalendarIcon size={18} /><h3 className="font-semibold">30-day plan</h3></div>
                <CalendarBuilder onBuild={buildCalendar} calendar={calendar} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <button onClick={() => setServerlessOpen(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><Upload size={16}/> Copy serverless snippet (for real AI)</button>
            </div>
          </div>
        </div>
      )}

      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Filter size={16} />
            <input placeholder="Search articles…" className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 outline-none" value={filters.q} onChange={e => setFilters(f => ({ ...f, q: e.target.value }))} />
            <select className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10" value={filters.cat} onChange={e => setFilters(f => ({ ...f, cat: e.target.value }))}>
              {categories.map(c => (<option key={c}>{c}</option>))}
            </select>
            <select className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10" value={filters.tag} onChange={e => setFilters(f => ({ ...f, tag: e.target.value }))}>
              {tags.map(t => (<option key={t}>{t}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm"><BarChart2 size={16} className="opacity-70" /><span className="opacity-80">Mock: 12,300 visits / mo • $450 ads</span></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a, idx) => (<React.Fragment key={a.id}>{idx === 1 && <AdSlot slot="grid-inline" />}<ArticleCard a={a} onOpen={setOpen} /></React.Fragment>))}
        </div>

        <div className="pt-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><DollarSign /> Recommended products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{sampleAffiliate.map(item => (<AffiliateCard key={item.title} item={item} />))}</div>
        </div>
      </section>

      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm opacity-80 flex flex-wrap items-center gap-3">
          <span>© {new Date().getFullYear()} RunAI</span><span>•</span><a href="#" className="hover:underline">Privacy</a><span>•</span><a href="#" className="hover:underline">About</a>
        </div>
      </footer>
      {serverlessOpen && (<ServerlessSnippet onClose={() => setServerlessOpen(false)} />)}
      <ArticleModal a={open} onClose={() => setOpen(null)} />
    </div>
  )
}

function ArticleGenerator({ onGenerate }: { onGenerate:(args:{topic:string,tone:string,targetKw:string,words?:number})=>Promise<void> }) {
  const [topic, setTopic] = useState('Marathon for beginners')
  const [tone, setTone] = useState('Practical and friendly')
  const [kw, setKw] = useState('marathon plan')
  const [words, setWords] = useState(900)
  const [busy, setBusy] = useState(false)
  async function handle() { setBusy(true); try { await onGenerate({ topic, tone, targetKw: kw, words }) } finally { setBusy(false) } }
  return (
    <div className="space-y-3 text-sm">
      <label className="block">Topic<input className="w-full mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10" value={topic} onChange={(e) => setTopic(e.target.value)} /></label>
      <label className="block">Tone/voice<input className="w-full mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10" value={tone} onChange={(e) => setTone(e.target.value)} /></label>
      <label className="block">Target keyword (SEO)<input className="w-full mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10" value={kw} onChange={(e) => setKw(e.target.value)} /></label>
      <label className="block">Approx. words<input type="number" className="w-full mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10" value={words} onChange={(e) => setWords(parseInt(e.target.value || '0',10))} /></label>
      <button onClick={handle} disabled={busy} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><Newspaper size={16}/> {busy ? 'Generating…' : 'Generate article'}</button>
      <p className="text-xs opacity-70">Tip: Use specific topics like "How to run 5K under 25 minutes".</p>
    </div>
  )
}

function LayoutGenerator({ onGenerate }: { onGenerate:(args:{prompt:string})=>Promise<void> }) {
  const [prompt, setPrompt] = useState('Energy, pro, compact magazine')
  const [busy, setBusy] = useState(false)
  async function handle() { setBusy(true); try { await onGenerate({ prompt }) } finally { setBusy(false) } }
  return (
    <div className="space-y-3 text-sm">
      <label className="block">Describe desired style<input className="w-full mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10" value={prompt} onChange={(e) => setPrompt(e.target.value)} /></label>
      <button onClick={handle} disabled={busy} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><Wand2 size={16}/> {busy ? 'Suggesting…' : 'Suggest layout'}</button>
      <p className="text-xs opacity-70">Examples: "natural trail, airy grid", "tempo/energy, compact timeline".</p>
    </div>
  )
}

function CalendarBuilder({ onBuild, calendar }: { onBuild:(seed:string)=>void, calendar:{date:string,title:string,slug:string}[] }) {
  const [seed, setSeed] = useState('Running')
  return (
    <div className="space-y-3 text-sm">
      <label className="block">Monthly theme<input className="w-full mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10" value={seed} onChange={(e) => setSeed(e.target.value)} /></label>
      <button onClick={() => onBuild(seed)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><CalendarIcon size={16}/> Build 30-day plan</button>
      {calendar.length > 0 && (<div className="mt-3 max-h-40 overflow-auto text-xs"><table className="w-full"><thead><tr className="text-left opacity-70"><th className="py-1 pr-2">Date</th><th className="py-1">Title</th></tr></thead><tbody>{calendar.map(c => (<tr key={c.date} className="border-top border-white/10"><td className="py-1 pr-2 whitespace-nowrap">{c.date}</td><td className="py-1">{c.title}</td></tr>))}</tbody></table></div>)}
    </div>
  )
}

function ServerlessSnippet({ onClose }: { onClose:()=>void }) {
  const snippet = `// Next.js (app or pages): /api/generate.ts
import type { NextRequest } from "next/server";
export const runtime = "edge"; // fast and cheap

export default async function handler(req: NextRequest) {
  const { topic, tone, targetKw, words } = await req.json();
  const prompt = \`Write an English article about \${topic} for runners.
Tone: \${tone}
Target keyword (SEO): \${targetKw}
Structure: title, intro, 4–6 subheadings with practical tips, bullet lists where it makes sense, and a conclusion.
Return JSON with fields: title, summary, html (the article body as simple HTML), category, tags (array), heroImage (URL).
Words: about \${words}\`;
  const r = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Content-Type": "application/json", Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\` }, body: JSON.stringify({ model: "gpt-4.1-mini", input: prompt, response_format: { type: "json_object" } }) });
  const data = await r.json();
  const obj = JSON.parse(data.output[0].content[0].text);
  return new Response(JSON.stringify({ id: Math.random().toString(36).slice(2), title: obj.title, slug: obj.title.toLowerCase().replace(/\\s+/g, "-"), heroImage: obj.heroImage, category: obj.category || "Training", tags: obj.tags || [targetKw], date: new Date().toISOString().slice(0,10), summary: obj.summary, content: obj.html.replaceAll("<strong>", "**").replaceAll("</strong>", "**"), readMinutes: Math.max(4, Math.round((obj.html || '').split(/\\s+/).length / 180)) }), { headers: { "Content-Type": "application/json" } });
}`
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-[#0e1729] shadow-2xl">
        <div className="p-4 flex items-center justify-between"><h3 className="font-semibold">Serverless snippet (paste into /api/generate.ts)</h3><button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><X size={16}/>Close</button></div>
        <div className="max-h-[60vh] overflow-auto p-4"><pre className="text-xs leading-relaxed whitespace-pre-wrap">{snippet}</pre></div>
      </div>
    </div>
  )
}

function mockParagraph(topic: string, tone: string) {
  const bits = [
    `Focus on steady progression and balance volume with recovery. ${topic} gets easier when you prioritize sleep, easy heart-rate work and short, systematic sessions.`,
    `Stick to two simple key workouts per week. Let ${topic.toLowerCase()} be guided by body signals—not just watch data.`,
    `Use zone 2 as your base and add short strides or pickups to stimulate economy. Log perceived effort, not just pace.`,
    `Test every 3–4 weeks: 20 minutes controlled-hard. Adjust the plan based on response instead of trusting generic templates.`,
    `Do strength for calves, hamstrings and hip stabilizers. It’s cheap injury insurance that pays off in speed.`,
  ]
  return bits[Math.floor(Math.random()*bits.length)]
}
