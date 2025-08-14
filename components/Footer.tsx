export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm opacity-80 flex flex-col gap-2">
        <div>© {new Date().getFullYear()} RunAI</div>
        <div>
          This site contains affiliate links and advertisements. As an Amazon Associate, we earn from qualifying purchases.
        </div>
      </div>
    </footer>
  )
}