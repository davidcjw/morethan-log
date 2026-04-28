const CONFIG = {
  // profile setting (required)
  profile: {
    name: "david chong",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "software engineer",
    bio: "i love durians and all things smart home",
    email: "davidcjw@gmail.com",
    linkedin: "davidcjw",
    github: "davidcjw",
    instagram: "",
  },
  projects: [
    {
      name: `medium blog`,
      href: "https://medium.com/@davidcjw",
    },
    {
      name: `buy me a coffee`,
      href: "https://www.buymeacoffee.com/davidcjw",
    },
  ],
  // blog setting (required)
  blog: {
    title: "David's Smart Home Notes and Everything In Between",
    description: "Practical smart home guides for Singapore HDBs, covering Matter, Thread, Zigbee, Wi-Fi, Home Assistant, privacy, and reliable setup.",
  },

  // CONFIG configration (required)
  link: "https://davidcjw.com",
  since: 2024, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID),
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: Boolean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: Boolean(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION),
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: Boolean(process.env.NEXT_PUBLIC_CUSDIS_APP_ID),
    config: {
      host: "https://cusdis.com",
      appid: process.env.NEXT_PUBLIC_CUSDIS_APP_ID || "", // Embed Code -> data-app-id value
    },
  },
  ads: {
    enabled: true,
    sponsors: [
      // Example approved sponsor:
      // {
      //   id: "smart-home-partner",
      //   title: "Smart Home Partner",
      //   description: "Trusted Matter and Zigbee gear for Singapore homes.",
      //   href: "https://example.com",
      //   image: "/sponsors/smart-home-partner.png",
      //   label: "Advertisement",
      //   placements: ["sidebar", "article", "feed"],
      //   startsAt: "2026-01-01",
      //   endsAt: "2026-12-31",
      // },
    ],
    packages: [
      {
        id: "sidebar",
        name: "Sidebar sponsorship",
        price: "Monthly placement",
        placement: "Post sidebar and homepage rail",
        description:
          "A compact sponsor card beside long-form smart home guides.",
        href: process.env.NEXT_PUBLIC_STRIPE_SPONSOR_SIDEBAR_LINK || "",
      },
      {
        id: "article",
        name: "Article sponsorship",
        price: "Monthly placement",
        placement: "Inline article slot",
        description:
          "A clearly labeled sponsor block inside post pages for readers already engaged with the guide.",
        href: process.env.NEXT_PUBLIC_STRIPE_SPONSOR_ARTICLE_LINK || "",
      },
    ],
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
