import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-white hover:text-white/90"
        >
          RunAI
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full border border-white/15 bg-white/10 text-white/90 
                       hover:bg-white/20 hover:shadow-md hover:shadow-black/20 
                       focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          >
            Home
          </Link>
          <Link
            href="/sitemap.xml"
            className="px-3 py-1.5 rounded-full border border-white/15 bg-white/10 text-white/90 
                       hover:bg-white/20 hover:shadow-md hover:shadow-black/20 
                       focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          >
            Sitemap
          </Link>
          <Link
            href="/feed.xml"
            className="px-3 py-1.5 rounded-full border border-white/15 bg-white/10 text-white/90 
                       hover:bg-white/20 hover:shadow-md hover:shadow-black/20 
                       focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          >
            RSS
          </Link>
        </nav>
      </div>
    </header>
  )
}
