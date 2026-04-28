import { useState } from "react"

import SearchInput from "./SearchInput"
import { FeedHeader } from "./FeedHeader"
import Footer from "./Footer"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"
import GuideList from "./GuideList"
import TagList from "./TagList"
import MobileProfileCard from "./MobileProfileCard"
import ProfileCard from "./ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import SponsorSlot from "src/components/SponsorSlot"
import AdvertiseCard from "src/components/AdvertiseCard"

const HEADER_HEIGHT = 60

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <StyledWrapper>
      <div
        className="lt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <GuideList />
        <TagList />
      </div>
      <div className="mid">
        <section className="feed-hero" aria-labelledby="feed-title">
          <div className="eyebrow">Singapore smart home field notes</div>
          <h1 id="feed-title">{CONFIG.blog.title}</h1>
          <p>{CONFIG.blog.description}</p>
          <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="mobile-index">
            <GuideList />
            <TagList />
          </div>
        </section>
        <FeedHeader />
        <PostList q={q} />
        <MobileProfileCard />
        <div className="footer">
          <Footer />
        </div>
      </div>
      <div
        className="rt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <ProfileCard />
        <ServiceCard />
        <SponsorSlot placement="feed" />
        <AdvertiseCard />
        <ContactCard />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  grid-template-columns: repeat(12, minmax(0, 1fr));

  padding: 1.5rem 0 2.5rem;
  display: grid;
  gap: 1.25rem;
  min-width: 0;

  @media (max-width: 768px) {
    display: block;
    padding: 1rem 0 2rem;
  }

  > .lt {
    display: none;
    overflow: scroll;
    position: sticky;
    grid-column: span 2 / span 2;
    top: ${HEADER_HEIGHT - 10}px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1024px) {
      display: block;
    }
  }

  > .mid {
    grid-column: span 12 / span 12;
    min-width: 0;

    @media (min-width: 1024px) {
      grid-column: span 7 / span 7;
    }

    > .feed-hero {
      margin-bottom: 1rem;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 1rem;
      max-width: 100%;
      overflow: hidden;
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "white" : theme.colors.gray3};

      .eyebrow {
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.blue11};
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 800;
        text-transform: uppercase;
      }

      h1 {
        max-width: 40rem;
        font-size: 1.65rem;
        line-height: 2.05rem;
        font-weight: 850;
        letter-spacing: 0;
        overflow-wrap: anywhere;
      }

      p {
        margin: 0.75rem 0 1rem;
        max-width: 40rem;
        color: ${({ theme }) => theme.colors.gray11};
        font-size: 0.9375rem;
        line-height: 1.625rem;
        overflow-wrap: anywhere;
      }

      @media (min-width: 1024px) {
        margin-bottom: 1.25rem;
        padding: 1.25rem;

        h1 {
          font-size: 2rem;
          line-height: 2.5rem;
        }
      }
    }

    .mobile-index {
      max-width: 100%;

      @media (min-width: 1024px) {
        display: none;
      }
    }

    > .footer {
      padding-bottom: 2rem;
      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  > .rt {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    display: none;
    overflow: scroll;
    position: sticky;
    top: ${HEADER_HEIGHT - 10}px;
    min-width: 0;

    @media (min-width: 1024px) {
      display: block;
      grid-column: span 3 / span 3;
    }

    .footer {
      padding-top: 1rem;
    }
  }
`
