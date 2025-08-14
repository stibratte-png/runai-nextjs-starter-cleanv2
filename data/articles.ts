import fs from 'node:fs/promises'
import path from 'node:path'
export type Article = { id:string,title:string,slug:string,heroImage:string,category:string,tags:string[],date:string,summary:string,content:string,readMinutes:number }
export async function getArticles(): Promise<Article[]> {
  const p = path.join(process.cwd(), 'data', 'articles.json')
  try { const raw = await fs.readFile(p, 'utf8'); return JSON.parse(raw) } catch { return [] }
}
