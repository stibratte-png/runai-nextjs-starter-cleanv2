mport '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RunAI – AI-powered running site',
  description: 'Generate and publish running articles automatically. Monetize with ads and affiliates.',
  metadataBase: new URL(process.env.SITE_URL || 'https://runai.example.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RunAI – AI-powered running site',
    description: 'Generate and publish running articles automatically. Monetize with ads and affiliates.',
    url: process.env.SITE_URL || 'https://runai.example.com',
    siteName: 'RunAI',
    type: 'website',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense verification meta tag */}
        <meta name="google-adsense-account" content="ca-pub-7638173034547715" />
        {/* AdSense script for loading ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638173034547715"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}