# David's Smart Home Notes

This is the source code for [davidcjw.com](https://davidcjw.com), a Next.js blog focused on smart home guides for Singapore HDBs, Matter, Thread, Zigbee, Wi-Fi, Home Assistant, privacy, and reliable setup.

The site uses Notion as the CMS, Vercel for hosting, Cusdis for comments, Redis for public view counts, and manually approved direct sponsorship slots for advertising.

## Stack

- Next.js 13 Pages Router
- React 18
- TypeScript
- Emotion CSS-in-JS
- Notion as the content source via `notion-client` and `react-notion-x`
- TanStack React Query for dehydrated static data
- Vercel Analytics and optional Google Analytics
- Cusdis comments
- Native Redis connection through Vercel Marketplace for view counts
- Stripe Payment Links for optional sponsor package checkout

## Main Features

- Static blog pages generated from a public Notion database.
- ISR revalidation for homepage, post pages, and hub pages.
- Homepage search, category filtering, ordering, pagination, and top-tag filtering.
- Top 10 tags shown by usage count, with the rest expandable.
- Public post view counts backed by Redis.
- Cusdis comment box on post pages.
- Desktop post sidebar with view count, comment link, sponsor slot, and advertise card.
- Mobile inline engagement and sponsor blocks.
- `/advertise` page for direct sponsorship packages.
- Manual sponsor approval through `site.config.js`.
- RSS feed at `/feed`.
- Sitemap generation after production builds.
- SEO metadata, canonical URLs, Open Graph, Twitter cards, and JSON-LD.

## Local Setup

Install dependencies:

```bash
yarn install
```

Create `.env.local`:

```env
NOTION_PAGE_ID=

REDIS_URL=
NEXT_PUBLIC_CUSDIS_APP_ID=

NEXT_PUBLIC_STRIPE_SPONSOR_SIDEBAR_LINK=
NEXT_PUBLIC_STRIPE_SPONSOR_ARTICLE_LINK=

NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=

TOKEN_FOR_REVALIDATE=
```

Run the dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
yarn dev
```

Runs the local Next.js dev server.

```bash
yarn lint
```

Runs Next.js linting.

```bash
yarn build
```

Builds the site and then runs `next-sitemap`.

```bash
yarn start
```

Runs the production server after a build.

## Environment Variables

### Required

`NOTION_PAGE_ID`

The public Notion collection page ID used as the content database.

### Recommended

`REDIS_URL`

Native Redis connection string from the Vercel Redis Marketplace integration. Used by `/api/views` and `/api/views/[slug]` for public view counts.

`NEXT_PUBLIC_CUSDIS_APP_ID`

Cusdis app ID copied from the Cusdis embed code as `data-app-id`. Enables the comments section.

### Optional

`REDIS_CONNECTION_STRING`

Fallback Redis connection string name. The code checks `REDIS_URL` first.

`NEXT_PUBLIC_STRIPE_SPONSOR_SIDEBAR_LINK`

Stripe Payment Link for the sidebar sponsorship package.

`NEXT_PUBLIC_STRIPE_SPONSOR_ARTICLE_LINK`

Stripe Payment Link for the article sponsorship package.

`NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`

Enables Google Analytics.

`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

Adds Google Search Console verification.

`NEXT_PUBLIC_NAVER_SITE_VERIFICATION`

Adds Naver Search Advisor verification.

`NEXT_PUBLIC_UTTERANCES_REPO`

Legacy Utterances comments support. Disabled by default in `site.config.js`; Cusdis is the preferred comments provider.

`TOKEN_FOR_REVALIDATE`

Secret for `/api/revalidate`.

### Not Needed

These older KV/Upstash REST variables are not used by the current implementation:

```env
KV_REST_API_URL=
KV_REST_API_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The app uses native Redis via `REDIS_URL`.

## Notion CMS Setup

The app expects `NOTION_PAGE_ID` to point to a public Notion database/collection page.

Expected post properties include:

- `title`
- `slug`
- `summary`
- `date`
- `status`
- `type`
- `category`
- `tags`
- `thumbnail`
- `author`

Publishing rules:

- Homepage posts use `status = Public` and `type = Post`.
- Detail routes accept `status = Public` or `PublicOnDetail`.
- Detail routes accept `type = Post`, `Paper`, or `Page`.
- Posts without a title, slug, or valid publish date are filtered out.
- Future-dated posts are hidden until the date is eligible.

Supported content types:

- `Post`: normal blog article with post header, comments, views, and sponsor UI.
- `Page`: full page content, such as about or resume.
- `Paper`: rendered as a detail page with paper-specific spacing.

## Comments With Cusdis

This site uses Cusdis Cloud by default.

Setup:

1. Go to [cusdis.com](https://cusdis.com/).
2. Sign in with GitHub, GitLab, or Google.
3. Create a site/app for `https://davidcjw.com`.
4. Open the embed code.
5. Copy the value from `data-app-id`.
6. Add it as:

```env
NEXT_PUBLIC_CUSDIS_APP_ID=your-cusdis-app-id
```

7. Add the same variable in Vercel.
8. Restart local dev or redeploy production.

Comments render below posts in the `Conversation / Comments` section. Cusdis comments are moderated in the Cusdis dashboard.

## View Counts With Redis

View counts use Redis through these API routes:

- `GET /api/views?slugs=slug-a,slug-b`
- `POST /api/views/[slug]`

The `GET` route reads counts for feed cards and does not increment anything.

The `POST` route increments a post view count and sets an HTTP-only cookie so normal refreshes do not spam the count.

Setup on Vercel:

1. Open the Vercel project.
2. Go to Storage or Marketplace.
3. Install/connect the native Redis integration.
4. Connect the Redis database to this project.
5. Confirm `REDIS_URL` exists in the project environment variables.
6. Redeploy.

Setup locally:

```bash
vercel env pull .env.local
```

or manually add:

```env
REDIS_URL=redis://...
```

If Redis is missing or unreachable, the API returns `enabled: false` and the UI hides view counts instead of crashing.

## Sponsorships And Advertisements

This app supports direct sponsor placements, not automatic ad network insertion.

Current sponsor surfaces:

- Homepage right rail
- Post desktop sidebar
- Post mobile inline block
- Inline article placement
- `/advertise` package page

The `/advertise` page shows sponsorship packages from `CONFIG.ads.packages`.

If Stripe Payment Links are missing, the package buttons fall back to email:

```txt
davidcjw@gmail.com
```

with the subject:

```txt
Sponsor David's Smart Home Notes
```

To enable Stripe checkout links, create Stripe Payment Links and set:

```env
NEXT_PUBLIC_STRIPE_SPONSOR_SIDEBAR_LINK=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_SPONSOR_ARTICLE_LINK=https://buy.stripe.com/...
```

### Adding An Approved Sponsor

Sponsors are intentionally manual. Payment does not automatically publish an ad.

After an advertiser pays and sends approved creative, add them to `CONFIG.ads.sponsors` in `site.config.js`:

```js
sponsors: [
  {
    id: "example-sponsor",
    title: "Example Smart Home Store",
    description: "Matter, Zigbee, and Home Assistant gear for Singapore homes.",
    href: "https://example.com",
    image: "/sponsors/example-sponsor.png",
    label: "Advertisement",
    cta: "Shop now",
    placements: ["sidebar", "article", "feed"],
    startsAt: "2026-05-01",
    endsAt: "2026-05-31",
  },
],
```

Put sponsor images in:

```txt
public/sponsors/
```

Sponsor links render with:

```html
rel="sponsored noopener noreferrer"
```

Every sponsor block should remain clearly labeled as `Advertisement` or `Sponsored`.

## Homepage Pagination And Tags

The homepage renders 10 posts per page on the client.

Filtering and ordering apply before pagination:

- Search query
- Tag
- Category
- Ascending/descending date order

Only visible post slugs are sent to `/api/views`, so the homepage does not request view counts for every post at once.

Tags are sorted by usage count. The top 10 are visible by default, and the remaining tags can be expanded.

## Hub Pages

The site includes static hub pages:

- `/smart-home-singapore`
- `/hdb-smart-home-guide`
- `/matter-thread-zigbee-wifi`

Hub definitions live in `src/libs/hub-config.ts`. Each hub filters public posts by matching configured keywords against post title, slug, summary, tags, and categories.

## Revalidation

The revalidation endpoint is:

```txt
/api/revalidate?secret=TOKEN_FOR_REVALIDATE
```

Specific path:

```txt
/api/revalidate?secret=TOKEN_FOR_REVALIDATE&path=/some-slug
```

All post paths:

```txt
/api/revalidate?secret=TOKEN_FOR_REVALIDATE
```

Set `TOKEN_FOR_REVALIDATE` in Vercel before using this endpoint.

## Deployment

This project is intended to run on Vercel.

Deployment checklist:

1. Add all required environment variables in Vercel.
2. Connect native Redis and confirm `REDIS_URL`.
3. Add `NEXT_PUBLIC_CUSDIS_APP_ID`.
4. Add Stripe sponsor links if you want checkout buttons instead of email fallback.
5. Deploy.
6. Confirm `/`, `/advertise`, a post page, `/feed`, and `/sitemap.xml` work.

## Useful Files

- `site.config.js`: profile, blog settings, plugins, comments, ads, and sponsor packages.
- `src/pages/index.tsx`: homepage static props and metadata.
- `src/pages/[slug].tsx`: post/page detail routes.
- `src/pages/advertise.tsx`: sponsorship package page.
- `src/pages/api/views`: view count APIs.
- `src/pages/api/revalidate.ts`: ISR revalidation endpoint.
- `src/routes/Feed`: homepage feed, filters, tags, pagination, and cards.
- `src/routes/Detail`: post/page rendering, comments, sponsor rail, and Notion renderer.
- `src/libs/redis.ts`: Redis client setup.
- `src/libs/hub-config.ts`: static hub page configuration.

## Verification

Run:

```bash
yarn lint
yarn build
```

Known non-blocking warnings:

- `src/hooks/useScheme.ts` has an existing React hook dependency warning.
- `next.config.js` uses the experimental `cpus` setting.
- Some Notion pages can exceed Next.js large page data warnings.
- Notion author lookup may log `missing user` for unavailable Notion user records.
- Browserslist may warn that `caniuse-lite` is outdated.

These warnings currently do not block the production build.

## Notes

- Do not commit `.env.local`.
- Do not expose Redis URLs or tokens publicly.
- Keep ad publishing manual so sponsors are reviewed before appearing on the site.
- Keep sponsor labeling clear for readers and compliance.
- If the homepage becomes slow again after many more posts, the next optimization is true static/server paginated routes instead of client-side pagination.
