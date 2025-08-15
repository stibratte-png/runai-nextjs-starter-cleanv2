import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          RunAI
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Home
          </Link>
          <Link
            href="/category/training"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Training
          </Link>
          <Link
            href="/category/gear"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Gear
          </Link>
          <Link
            href="/category/nutrition"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Nutrition
          </Link>
          <Link
            href="/category/injury-prevention"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Injury Prevention
          </Link>
        </nav>
      </div>
    </header>
  )
}
