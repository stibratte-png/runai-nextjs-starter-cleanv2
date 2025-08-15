export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm opacity-80">
        <div>© {new Date().getFullYear()} RunAI. All rights reserved.</div>
        <div className="mt-2">
          <a
            href="/sitemap.xml"
            className="underline hover:no-underline"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  )
}
