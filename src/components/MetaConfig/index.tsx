import { CONFIG } from "site.config"
import Head from "next/head"

export type MetaConfigProps = {
  title: string
  description: string
  /** Open Graph / schema hint, e.g. website, BlogPosting, AboutPage, ProfilePage */
  type: string
  date?: string
  modifiedDate?: string
  image?: string
  /** Canonical page URL (defaults to `url` when omitted) */
  url: string
  canonicalUrl?: string
  /** schema.org JSON-LD (e.g. WebSite, BlogPosting) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** Open Graph expects `website` or `article`, not Notion labels. */
export function getOgType(pageType: string): "website" | "article" {
  const t = pageType.toLowerCase()
  if (t === "post" || t === "article" || t === "blogposting") {
    return "article"
  }
  return "website"
}

function toOgLocale(lang: string): string {
  return lang.replace(/-/g, "_")
}

const MetaConfig: React.FC<MetaConfigProps> = (props) => {
  const canonical = props.canonicalUrl ?? props.url
  const ogType = getOgType(props.type)
  const ogLocale = CONFIG.lang ? toOgLocale(CONFIG.lang) : undefined

  const jsonLdPayload = props.jsonLd
    ? Array.isArray(props.jsonLd)
      ? props.jsonLd
      : props.jsonLd
    : null

  return (
    <Head>
      <title>{props.title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="follow, index" />
      <meta charSet="UTF-8" />
      <meta name="description" content={props.description} />
      {/* og */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.url} />
      {ogLocale && <meta property="og:locale" content={ogLocale} />}
      {props.image && <meta property="og:image" content={props.image} />}
      {/* twitter */}
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      {props.image && <meta name="twitter:image" content={props.image} />}
      {/* article */}
      {ogType === "article" && props.date && (
        <>
          <meta property="article:published_time" content={props.date} />
          {props.modifiedDate && (
            <meta
              property="article:modified_time"
              content={props.modifiedDate}
            />
          )}
          <meta property="article:author" content={CONFIG.profile.name} />
        </>
      )}
      {jsonLdPayload && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPayload),
          }}
        />
      )}
    </Head>
  )
}

export default MetaConfig
