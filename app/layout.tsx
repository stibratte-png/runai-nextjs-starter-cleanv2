import '@/styles/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header' // make sure Header.tsx exists
import Footer from '@/components/Footer' // optional: create Footer.tsx if you want one

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
      <body>
        <Header />
        {children}
        <Footer /> {/* remove this line if you’re not adding a footer yet */}
      </body>
    </html>
  )
}