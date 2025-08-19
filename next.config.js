// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (seed + fallback)
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },

      // OpenAI (DALL·E) – genererte bilder returnert av Images API
      { protocol: 'https', hostname: 'oaidalleapiprodscus.blob.core.windows.net' },

      // (valgfritt) legg til flere kilder ved behov:
      // { protocol: 'https', hostname: 'cdn.openai.com' },
      // { protocol: 'https', hostname: 'pbs.twimg.com' },
    ],
  },
}

module.exports = nextConfig
