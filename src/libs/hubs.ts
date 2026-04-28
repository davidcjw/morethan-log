import type { GetStaticProps } from "next"
import { CONFIG } from "site.config"
import { getPosts } from "src/apis"
import { filterPosts } from "src/libs/utils/notion"
import type { TPost } from "src/types"
import { HUBS, HUB_LIST } from "./hub-config"
import type { HubConfig, PublicHubConfig, HubSlug } from "./hub-config"

export type HubPageProps = {
  hub: PublicHubConfig
  hubs: PublicHubConfig[]
  posts: TPost[]
}

function getSearchText(post: TPost) {
  return [
    post.title,
    post.slug,
    post.summary,
    ...(post.tags || []),
    ...(post.category || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

export function getHubPosts(posts: TPost[], hub: HubConfig) {
  return posts.filter((post) => {
    const searchText = getSearchText(post)
    return hub.match.some((term) => searchText.includes(term.toLowerCase()))
  })
}

export function getHubStaticProps(slug: HubSlug): GetStaticProps<HubPageProps> {
  return async () => {
    const hub = HUBS[slug]
    const posts = getHubPosts(filterPosts(await getPosts()), hub)
    const { match, ...publicHub } = hub

    return {
      props: {
        hub: publicHub,
        hubs: HUB_LIST,
        posts,
      },
      revalidate: CONFIG.revalidateTime,
    }
  }
}
