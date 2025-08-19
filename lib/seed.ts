// /lib/seed.ts

export type Article = {
  title: string
  body: string
  category: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  date: string // YYYY-MM-DD
  image?: string
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const SEED_ARTICLES: Article[] = [
  {
    title: 'Build Endurance Safely: A 6-Week Base Plan',
    body:
      'A simple base phase helps you handle more training later without burnout. Weeks 1–2: three easy runs (30–45 min). ' +
      'Add 6×100 m relaxed strides twice/week. Weeks 3–4: add one light progression run. Weeks 5–6: include one hills session. ' +
      'Keep most running easy; progress volume by ~10% per week.',
    category: 'Training',
    date: '2025-08-19',
    image:
      'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Best Budget Running Shoes (2025)',
    body:
      'Looking for value? Prioritize midsole durability and fit. Top picks under $120: Nike Pegasus — versatile daily trainer; ' +
      'Brooks Launch — firm, snappy feel for uptempo; ASICS Novablast — soft and bouncy for recovery days. Rotate pairs to extend life.',
    category: 'Gear',
    date: '2025-08-19',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Fueling a Half Marathon: What to Eat & When',
    body:
      'Carbs drive performance. 24–48h before: focus on carbs (rice, pasta, bread). Morning of: normal salt; avoid new foods. ' +
      'Breakfast (3–2h pre-start): 2–3 g/kg carbs (toast + jam, oatmeal, bananas). During race: 30–60 g carbs/hour; practice in training.',
    category: 'Nutrition',
    date: '2025-08-19',
    image:
      'https://images.unsplash.com/photo-1543352634-87377d679080?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Stop Shin Splints Before They Start',
    body:
      'Shin pain usually comes from load spikes and weak calves. Do 2–3×/week: eccentric calf raises 3×12; toe raises 3×15; ' +
      'single‑leg balance 3×30s. Progress only one variable at a time (frequency, duration, or intensity). Check shoe wear and cadence.',
    category: 'Injury Prevention',
    date: '2025-08-19',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Interval Workouts That Actually Make You Faster',
    body:
      'Use two proven sessions and progress slowly. 6×3 min @ 5K–10K effort (2 min easy jog), og 12×400 m @ 3–5K effort (200 m jog). ' +
      'Varm opp 12–15 min; avslutt med 10 min lett + 6×100 m strides. Hold jevn fart og god teknikk.',
    category: 'Training',
    date: '2025-08-19',
    image:
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1600&auto=format&fit=crop',
  },
  // Ekstra artikler for mer fylde på forsiden
  {
    title: 'Race Day Checklist: Half & Full Marathon',
    body:
      'Pin bib, gels, socks you trust, anti-chafe, watch charged, shoes double-knotted, breakfast plan, hydration plan. ' +
      'Arrive early, warm up lightly, start conservative for the first 3–5 km.',
    category: 'Training',
    date: '2025-08-15',
    image:
      'https://images.unsplash.com/photo-1502810190503-8303352d2b8b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Electrolytes 101: How Much Sodium Do Runners Need?',
    body:
      'Sweat rates vary, but many runners benefit from 300–600 mg sodium per hour in warm conditions. Test in training; adjust to thirst. ' +
      'Avoid overhydration; clear urine + frequent bathroom breaks may signal too much fluid.',
    category: 'Nutrition',
    date: '2025-08-10',
    image:
      'https://images.unsplash.com/photo-1535916707207-35f97e715e1b?q=80&w=1600&auto=format&fit=crop',
  },
]
