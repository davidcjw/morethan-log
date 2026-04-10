import { GetServerSideProps } from "next"
import { CONFIG } from "site.config"
import { getPosts } from "src/apis"
import { buildRssFeed } from "src/libs/rss/buildRssFeed"
import { filterPosts } from "src/libs/utils/notion"

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = filterPosts(await getPosts())
  const xml = buildRssFeed(posts)

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CONFIG.revalidateTime}, stale-while-revalidate`
  )
  res.write(xml)
  res.end()

  return { props: {} }
}

/** RSS is sent in getServerSideProps; this fallback is never shown. */
export default function FeedPage() {
  return null
}
