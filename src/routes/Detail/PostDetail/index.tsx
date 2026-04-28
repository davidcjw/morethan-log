import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import ViewCount from "src/components/ViewCount"
import CommentCTA from "src/components/CommentCTA"
import SponsorSlot from "src/components/SponsorSlot"
import AdvertiseCard from "src/components/AdvertiseCard"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined
  const isPost = data.type[0] === "Post"

  return (
    <StyledWrapper>
      <article className="post-shell">
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {isPost && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {isPost && (
          <>
            <div className="mobile-engagement">
              <div className="mobile-actions">
                <ViewCount slug={data.slug} increment compact />
                <CommentCTA compact />
              </div>
              <SponsorSlot placement="article" />
              <AdvertiseCard compact />
            </div>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
      {isPost && (
        <aside className="rail" aria-label="Post actions">
          <div className="rail-panel">
            <ViewCount slug={data.slug} increment />
            <CommentCTA />
          </div>
          <SponsorSlot placement="sidebar" />
          <AdvertiseCard />
        </aside>
      )}
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: start;
  gap: 1.5rem;
  margin: 0 auto;
  max-width: 72rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 42rem) 16rem;
  }

  > .post-shell {
    margin: 0 auto;
    border-radius: 1rem;
    width: 100%;
    max-width: 42rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px -1px rgba(0, 0, 0, 0.05);
    padding: 1.25rem;

    @media (min-width: 768px) {
      padding: 3rem;
    }
  }

  .mobile-engagement {
    display: block;
    margin: 2rem 0 1.5rem;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  .mobile-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
    align-items: center;
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 0.875rem 1rem;
    background-color: ${({ theme }) => theme.colors.gray2};
  }

  > .rail {
    display: none;

    @media (min-width: 1024px) {
      display: grid;
      position: sticky;
      top: 6rem;
      gap: 1rem;
    }
  }

  .rail-panel {
    display: grid;
    gap: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
  }
`
