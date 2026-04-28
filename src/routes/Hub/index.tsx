import Link from "next/link"
import { CONFIG } from "site.config"
import MetaConfig from "src/components/MetaConfig"
import type { HubPageProps } from "src/libs/hubs"
import PostCard from "src/routes/Feed/PostList/PostCard"
import styled from "@emotion/styled"

const HubPage: React.FC<HubPageProps> = ({ hub, hubs, posts }) => {
  const pageUrl = `${CONFIG.link}/${hub.slug}`
  const relatedHubs = hubs.filter((item) => item.slug !== hub.slug)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hub.title,
      description: hub.description,
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: hub.postListTitle,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${CONFIG.link}/${post.slug}`,
        name: post.title,
      })),
    },
  ]

  return (
    <>
      <MetaConfig
        title={hub.title}
        description={hub.description}
        type="CollectionPage"
        url={pageUrl}
        jsonLd={jsonLd}
      />
      <StyledWrapper>
        <header className="hero">
          <div className="eyebrow">{hub.eyebrow}</div>
          <h1>{hub.title}</h1>
          <p>{hub.description}</p>
          <div className="topics">
            {hub.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </header>

        <nav className="hub-links" aria-label="Smart home guide hubs">
          {relatedHubs.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`}>
              {item.title}
            </Link>
          ))}
        </nav>

        <section className="posts" aria-labelledby="hub-posts-title">
          <div className="section-header">
            <h2 id="hub-posts-title">{hub.postListTitle}</h2>
            <p>{posts.length} guides</p>
          </div>
          {posts.map((post) => (
            <PostCard key={post.id} data={post} />
          ))}
        </section>
      </StyledWrapper>
    </>
  )
}

export default HubPage

const StyledWrapper = styled.div`
  padding: 1.75rem 0 3rem;
  max-width: 50rem;
  margin: 0 auto;
  min-width: 0;

  .hero {
    margin-bottom: 1.25rem;

    .eyebrow {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.blue11};
      text-transform: uppercase;
    }

    h1 {
      margin-bottom: 0.75rem;
      font-size: 2rem;
      line-height: 2.5rem;
      font-weight: 850;
      letter-spacing: 0;
      overflow-wrap: anywhere;
    }

    p {
      margin: 0;
      max-width: 42rem;
      font-size: 1rem;
      line-height: 1.75rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }

  .topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;

    span {
      padding: 0.25rem 0.625rem;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
      background-color: ${({ theme }) => theme.colors.gray3};
    }
  }

  .hub-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem 0;
    margin-bottom: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray6};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};

    a {
      border-radius: 0.5rem;
      padding: 0.375rem 0.5rem;
      font-size: 0.9375rem;
      line-height: 1.5rem;
      font-weight: 750;
      color: ${({ theme }) => theme.colors.gray12};

      :hover {
        color: ${({ theme }) => theme.colors.blue11};
        background-color: ${({ theme }) => theme.colors.blue4};
      }
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: baseline;
    margin-bottom: 1rem;

    h2 {
      font-size: 1.375rem;
      line-height: 2rem;
      font-weight: 850;
    }

    p {
      margin: 0;
      flex-shrink: 0;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  @media (min-width: 768px) {
    padding-top: 3rem;

    .hero h1 {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }
`
