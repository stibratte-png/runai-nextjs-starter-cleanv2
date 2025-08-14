'use client'
import { useEffect } from 'react'
declare global { interface Window { adsbygoogle: any[] } }
function loadAdScript() {
  if (typeof window === 'undefined') return
  const present = document.querySelector('script[data-adsbygoogle]')
  if (!present) {
    const s = document.createElement('script')
    s.setAttribute('data-adsbygoogle','true')
    s.async = true
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    document.head.appendChild(s)
  }
}
export function GoogleAd({ slot, style }: { slot?: string | number, style?: React.CSSProperties }) {
  useEffect(() => { loadAdScript(); try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {} }, [])
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000'
  return (<ins className="adsbygoogle block w-full" style={style || { display: 'block' }} data-ad-client={client} data-ad-slot={slot || 'auto'} data-ad-format="auto" data-full-width-responsive="true" />)
}
export function StickyTopAd() { return (<div className="hidden md:block sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10"><div className="max-w-6xl mx-auto px-4 py-2"><GoogleAd /></div></div>) }
export function StickyBottomAd() { return (<div className="md:hidden fixed inset-x-0 bottom-0 z-40 backdrop-blur bg-black/60 border-t border-white/10"><div className="max-w-6xl mx-auto px-3 py-2"><GoogleAd /></div></div>) }
