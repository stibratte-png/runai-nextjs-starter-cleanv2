// lib/seed.ts
export type Article = {
  title: string
  body: string
  category: 'Training' | 'Gear' | 'Nutrition' | 'Injury Prevention'
  date: string
  image?: string
  slug: string
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function a(
  title: string,
  category: Article['category'],
  image: string,
  body: string
): Article {
  const date = new Date().toISOString().slice(0, 10)
  return { title, category, date, image, body, slug: slugify(title) }
}

export const SEED_ARTICLES: Article[] = [
  a(
    'Build Endurance Safely: A 6-Week Base Plan',
    'Training',
    'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop',
    `A simple base phase helps you handle more training later without burnout.

• Weeks 1–2: 3–4 easy runs (30–45 min). Add 6×100 m relaxed strides twice/week.
• Weeks 3–4: One longer run (50–70 min) + 2 easy days. Keep effort conversational.
• Weeks 5–6: Long run 70–90 min. Add 6×1 min steady pickups mid-run.

Recovery cues: poor sleep, heavy legs, elevated morning HR → cut volume 30% for 5–7 days.`
  ),
  a(
    'Best Budget Running Shoes (2025)',
    'Gear',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
    `Looking for value? Prioritize midsole durability and fit.

Top picks under $120:
• Nike Pegasus — versatile daily trainer.
• Brooks Launch — firm, snappy feel for uptempo.
• Saucony Ride — balanced cushioning for most runners.

Tip: Replace at ~500–700 km; rotate two pairs to reduce injury risk.`
  ),
  a(
    'Fueling a Half Marathon: What to Eat & When',
    'Nutrition',
    'https://images.unsplash.com/photo-1526401485004-2fda9f4d7d2a?q=80&w=1600&auto=format&fit=crop',
    `Carbs drive performance.

• 24–48h before: focus on carbs (rice, pasta, bread), normal salt, avoid new foods.
• Breakfast (2–3h pre-start): 2–3 g/kg carbs (toast + jam, oatmeal + banana).
• During race: 30–60 g carbs/hour via gels/chews + water.

Practice fueling on long runs to avoid GI surprises.`
  ),
  a(
    'Stop Shin Splints Before They Start',
    'Injury Prevention',
    'https://images.unsplash.com/photo-1518617840859-acd542e13d53?q=80&w=1600&auto=format&fit=crop',
    `Shin pain usually comes from load spikes and weak calves.

Do 2–3×/week:
• Eccentric calf raises 3×12
• Toe raises 3×15
• Single-leg balance 3×30s

Progress only one variable at a time: distance, intensity, or frequency.`
  ),
  a(
    'Interval Workouts That Actually Make You Faster',
    'Training',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop',
    `Use two proven sessions and progress slowly:

• 6×3 min @ 5K–10K effort, 2 min easy jog.
• 12×400 m @ 3–5K effort, 200 m jog.

Warm up 10–15 min easy + 4×20 s strides; cool down 10 min easy.
Keep easy days truly easy so quality stays high.`
  ),
]
