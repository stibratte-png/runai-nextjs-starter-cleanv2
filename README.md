# RunAI – AI-powered Running Site (Next.js + Tailwind)

Includes: AI article generator, AdSense ads (sticky top & bottom), affiliate slots, SEO (sitemap/robots/RSS), and a `public/` folder with favicon & OG image.

## Quick start
```bash
npm i
npm run dev  # http://localhost:3000
```
Create `.env.local`:
```
OPENAI_API_KEY=sk-...
SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1009010159
```

## Deploy on Vercel
- Import the repo
- Add the three env vars above in **Settings → Environment Variables (Production)**
- Redeploy

## Switch to real AI
Open `components/RunAIApp.tsx` and set:
```
const USE_LOCAL_MOCK = false;
```
Then commit & push to trigger a redeploy.
