const { CONFIG } = require("./site.config")
const fs = require("fs")
const path = require("path")

const PAGES_DIR = path.join(process.cwd(), ".next/server/pages")

let lastmodByPath

function toIsoDate(value) {
  if (!value) return undefined

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined

  return date.toISOString()
}

function getPostFromStaticProps(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
    const queries = data?.pageProps?.dehydratedState?.queries || []
    return queries.find(
      (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "post"
    )?.state?.data
  } catch {
    return undefined
  }
}

function getPostsFromStaticProps(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
    const queries = data?.pageProps?.dehydratedState?.queries || []
    return (
      queries.find(
        (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "posts"
      )?.state?.data || []
    )
  } catch {
    return []
  }
}

function getLastmodLookup() {
  if (lastmodByPath) return lastmodByPath

  lastmodByPath = {}
  if (!fs.existsSync(PAGES_DIR)) return lastmodByPath

  for (const file of fs.readdirSync(PAGES_DIR)) {
    if (!file.endsWith(".json") || file.endsWith(".js.nft.json")) continue

    const filePath = path.join(PAGES_DIR, file)
    const post = getPostFromStaticProps(filePath)
    if (post?.slug) {
      lastmodByPath[`/${post.slug}`] = toIsoDate(
        post.updatedTime || post.date?.start_date || post.createdTime
      )
      continue
    }

    if (file === "index.json") {
      const posts = getPostsFromStaticProps(filePath)
      const latest = posts
        .map((item) =>
          toIsoDate(
            item.updatedTime || item.date?.start_date || item.createdTime
          )
        )
        .filter(Boolean)
        .sort()
        .at(-1)

      if (latest) lastmodByPath["/"] = latest
    }
  }

  return lastmodByPath
}

module.exports = {
  siteUrl: CONFIG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  transform: async (config, loc) => {
    const lastmodLookup = getLastmodLookup()

    return {
      loc,
      changefreq: loc === "/" ? "daily" : "weekly",
      priority: loc === "/" ? 0.8 : 0.7,
      lastmod: lastmodLookup[loc] || new Date().toISOString(),
    }
  },
  additionalPaths: async () => [
    {
      loc: "/feed",
      changefreq: "daily",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
  ],
}
