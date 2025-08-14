import './globals.css'
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
      <body>{children}</body>
    </html>
  )
}
