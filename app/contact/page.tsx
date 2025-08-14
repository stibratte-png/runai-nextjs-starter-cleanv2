export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">
        Have questions, suggestions, or feedback? We’d love to hear from you.
      </p>

      <h2 className="text-xl font-semibold mb-2">Email</h2>
      <p className="mb-4">
        You can reach us at: <a href="mailto:runai.magazine@gmail.com" className="text-blue-500 underline">runai.magazine@gmail.com</a>
      </p>

      <h2 className="text-xl font-semibold mb-2">Business Inquiries</h2>
      <p>
        For business partnerships, advertising, or collaboration opportunities, please include “Business Inquiry” in your subject line.
      </p>
    </main>
  )
}