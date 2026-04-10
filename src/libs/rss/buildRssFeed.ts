import { CONFIG } from "site.config"
import { TPost } from "src/types"

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc822(date: Date): string {
  return date.toUTCString()
}

/**
 * RSS 2.0 feed for public posts (same visibility as the home feed).
 */
export function buildRssFeed(posts: TPost[]): string {
  const blogTitle = escapeXml(CONFIG.blog.title)
  const blogDesc = escapeXml(CONFIG.blog.description)
  const siteUrl = CONFIG.link.replace(/\/$/, "")
  const feedUrl = `${siteUrl}/feed`
  const lastBuild = toRfc822(new Date())

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/${post.slug}`
      const pub = new Date(post.date?.start_date || post.createdTime)
      const summary = escapeXml(post.summary || post.title)
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${toRfc822(pub)}</pubDate>
      <description>${summary}</description>
    </item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blogTitle}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${blogDesc}</description>
    <language>${escapeXml(CONFIG.lang)}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    <generator>morethan-log</generator>
${items}
  </channel>
</rss>
`

}
