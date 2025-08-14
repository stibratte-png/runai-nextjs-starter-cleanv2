export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use and share information when you visit or interact with our website.
        By using this site, you agree to the practices described here.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Usage data:</strong> pages viewed, approximate location, device, and browser information.</li>
        <li><strong>Cookies:</strong> small files stored on your device that help us remember preferences and understand site usage.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Advertising & Cookies</h2>
      <p className="mb-4">
        We display advertising on this site (for example, Google AdSense). Third-party vendors use cookies to serve ads based on your visits
        to this and other websites. You can learn more about how Google uses information from sites that use its services here:
        <a className="underline ml-1" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">policies.google.com/technologies/partner-sites</a>.
      </p>
      <p className="mb-4">
        You can manage ad personalization in your Google settings or opt out of third-party cookies in your browser.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Affiliate Disclosure</h2>
      <p className="mb-4">
        We participate in affiliate programs. When you buy through links on our site, we may earn a commission.
        This does not affect the price you pay and helps keep the site running.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
      <p className="mb-4">
        We retain non-personal analytics data for as long as necessary to analyze website performance and improve content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-1">
        If you have questions about this policy, contact us at:
        <a className="underline ml-1" href="mailto:runai.magazine@gmail.com">runai.magazine@gmail.com</a>
      </p>
      <p className="text-sm opacity-70">Last updated: {new Date().toISOString().slice(0, 10)}</p>
    </main>
  )
}