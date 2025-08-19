// /app/category/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SEED_ARTICLES, slugify } from '@/lib/seed'

const MAP: Record<string, 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'> = {
  'training': 'Training',
  'gear': 'Gear',
  'nutrition': 'Nutrition',
  'injury-prevention': 'Injury Prevention',
}

export async function generateStaticParams() {
  return Object.keys(MAP).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const category = MAP[params.slug]
  if (!category) return {}
  const title = `${category} — RunAI`
  const description = `Articles about ${category.toLowerCase()} for runners.`
  const base = process.env.SITE_URL || 'https://runai.example.com'
  const url = `${base}/category/${params.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = MAP[params.slug]
  if (!category) return notFound()

  const items = SEED_ARTICLES.filter((a) => a.category === category)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{category}</h1>
      {items.length === 0 && <p>No articles yet.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => {
          const slug = slugify(a.title)
          return (
            <Link
              key={slug}
              href={`/articles/${slug}`}
              aria-label={`Read article: ${a.title}`}
              className="text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {a.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.image} alt={a.title} className="w-full h-44 object-cover" loading="lazy" />
              )}
              <div className="p-3 space-y-1">
                <div className="text-xs opacity-70">{a.category} • {a.date}</div>
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-sm opacity-90">
                  {a.body.trim().split(/\s+/).slice(0, 28).join(' ')}…
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
