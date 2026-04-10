const { CONFIG } = require("./site.config")

module.exports = {
  siteUrl: CONFIG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  additionalPaths: async () => [
    {
      loc: "/feed",
      changefreq: "daily",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
  ],
}
