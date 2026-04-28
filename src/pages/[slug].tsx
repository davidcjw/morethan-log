import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryKey } from "src/constants/queryKey"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"
import { TPost } from "src/types"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

function getSchemaType(post: TPost) {
  if (post.slug === "about") return "AboutPage"
  if (post.slug === "resume") return "ProfilePage"
  if (post.type[0] === "Post") return "BlogPosting"
  return "WebPage"
}

function getAuthorJsonLd() {
  const sameAs = [
    CONFIG.profile.github && `https://github.com/${CONFIG.profile.github}`,
    CONFIG.profile.linkedin &&
      `https://www.linkedin.com/in/${CONFIG.profile.linkedin}`,
  ].filter(Boolean)

  return {
    "@type": "Person",
    name: CONFIG.profile.name,
    url: CONFIG.link,
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, filter)

  return {
    paths: filteredPost.map((row) => `/${row.slug}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  const posts = await getPosts()
  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t: any) => t.slug === slug)

  if (!postDetail) {
    return {
      notFound: true,
      revalidate: CONFIG.revalidateTime,
    }
  }

  const recordMap = await getRecordMap(postDetail?.id!)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
    ...postDetail,
    recordMap,
  }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  if (!post) return <CustomError />

  const image =
    post.thumbnail ||
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const isoDate = new Date(date).toISOString()
  const modifiedDate = new Date(post.updatedTime || date).toISOString()
  const pageUrl = `${CONFIG.link}/${post.slug}`
  const description = post.summary || CONFIG.blog.description
  const schemaType = getSchemaType(post)
  const author = getAuthorJsonLd()

  const jsonLd =
    schemaType === "BlogPosting"
      ? {
          "@context": "https://schema.org",
          "@type": schemaType,
          headline: post.title,
          description,
          url: pageUrl,
          datePublished: isoDate,
          dateModified: modifiedDate,
          author,
          ...(image ? { image: [image] } : {}),
        }
      : {
          "@context": "https://schema.org",
          "@type": schemaType,
          name: post.title,
          description,
          url: pageUrl,
          datePublished: isoDate,
          dateModified: modifiedDate,
          ...(schemaType === "ProfilePage" ? { mainEntity: author } : {}),
        }

  const meta = {
    title: post.title,
    date: isoDate,
    modifiedDate,
    image: image,
    description,
    type: schemaType,
    url: pageUrl,
    jsonLd,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
