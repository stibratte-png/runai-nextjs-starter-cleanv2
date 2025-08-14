import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black/70 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          RunAI
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
          <Link href="/privacy-policy" className="hover:opacity-80">Privacy</Link>
          <Link href="/contact" className="hover:opacity-80">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
