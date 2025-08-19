// /app/articles/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEED_ARTICLES, slugify } from '@/lib/seed'

type SearchParams = {
  t?: string
  b?: string
  c?: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  d?: string
  img?: string
}

function bySlug(slug: string) {
  return SEED_ARTICLES.find((a) => slugify(a.title) === slug)
}

function fromQuery(sp: SearchParams, slug: string) {
  if (!sp?.t || slugify(sp.t) !== slug) return null
  return {
    title: sp.t,
    body: sp.b ?? '',
    category: sp.c ?? 'Training',
    date: sp.d ?? new Date().toISOString().slice(0, 10),
    image: sp.img ?? '',
    slug,
  }
}

export async function generateStaticParams() {
  return SEED_ARTICLES.map((a) => ({ slug: slugify(a.title) }))
}

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: SearchParams }
): Promise<Metadata> {
  const base = process.env.SITE_URL || 'https://runai.example.com'
  const seed = bySlug(params.slug)
  const q = fromQuery(searchParams, params.slug)
  const a = seed ?? q
  if (!a) return {}

  const url = `${base}/articles/${params.slug}`
  const title = `${a.title} — RunAI`
  const description =
    a.body?.split(/\s+/).slice(0, 40).join(' ') + (a.body?.length ? '…' : '')

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: a.image ? [{ url: a.image }] : undefined,
      siteName: 'RunAI',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: a.image ? [a.image] : undefined,
    },
  }
}

export default function ArticlePage(
  { params, searchParams }: { params: { slug: string }, searchParams: SearchParams }
) {
  const base = process.env.SITE_URL || 'https://runai.example.com'
  const seed = bySlug(params.slug)
  const q = fromQuery(searchParams, params.slug)
  const a = seed ?? q
  if (!a) return notFound()

  const breadcrumbCategorySlug =
    a.category === 'Injury Prevention' ? 'injury-prevention' : a.category.toLowerCase()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    datePublished: a.date,
    image: a.image ? [a.image] : [],
    author: { '@type': 'Organization', name: 'RunAI' },
    publisher: { '@type': 'Organization', name: 'RunAI' },
    mainEntityOfPage: `${base}/articles/${params.slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}` },
      { '@type': 'ListItem', position: 2, name: a.category, item: `${base}/category/${breadcrumbCategorySlug}` },
      { '@type': 'ListItem', position: 3, name: a.title, item: `${base}/articles/${params.slug}` },
    ],
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 prose prose-invert">
      {/* Structured Data */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(articleJsonLd)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <p className="text-sm opacity-70">{a.category} • {a.date}</p>
      <h1 className="mb-4">{a.title}</h1>

      {a.image && (
        <div className="rounded-xl overflow-hidden mb-6 border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.image}
            alt={a.title}
            className="w-full h-auto max-h-[480px] object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="whitespace-pre-wrap leading-relaxed">{a.body}</div>
    </article>
  )
}
