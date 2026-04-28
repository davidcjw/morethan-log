import crypto from "crypto"

const VIEW_KEY_PREFIX = "morethan-log:views"

export function getViewKey(slug: string) {
  return `${VIEW_KEY_PREFIX}:${slug}`
}

export function getViewCookieName(slug: string) {
  const hash = crypto.createHash("sha1").update(slug).digest("hex")
  return `ml_view_${hash.slice(0, 24)}`
}

export function getViewCookieHeader(name: string) {
  const attributes = [`${name}=1`, "Path=/", "SameSite=Lax", "HttpOnly"]

  if (process.env.NODE_ENV === "production") {
    attributes.push("Secure")
  }

  return attributes.join("; ")
}

export function toViewCount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}
