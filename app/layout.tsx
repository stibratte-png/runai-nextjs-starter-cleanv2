import '@/styles/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'RunAI – Running tips, training & gear',
  description:
    'Running training plans, gear recommendations, nutrition and injury-prevention advice.',
  metadataBase: new URL(process.env.SITE_URL || 'https://runai.example.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RunAI – Running tips, training & gear',
    description:
      'Running training plans, gear recommendations, nutrition and injury-prevention advice.',
    url: process.env.SITE_URL || 'https://runai.example.com',
    siteName: 'RunAI',
    type: 'website',
    images: ['/og-image.png'], // fallback bilde i public/
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense verification meta tag */}
        <meta
          name="google-adsense-account"
          content={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxxxxxxxx'}
        />
        {/* AdSense script */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
            process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxxxxxxxx'
          }`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-black text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
