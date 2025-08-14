import '@/styles/globals.css'
import type { Metadata } from 'next'
import Head from 'next/head'

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
        <meta name="google-adsense-account" content="ca-pub-7638173034547715" />
      </head>
      <body>{children}</body>
    </html>
  )
}