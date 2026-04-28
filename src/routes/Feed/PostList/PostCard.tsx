import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"
import ViewCount from "src/components/ViewCount"

type Props = {
  data: TPost
  viewCount?: number
  viewsEnabled?: boolean
}

const PostCard: React.FC<Props> = ({ data, viewCount, viewsEnabled }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        {data.thumbnail && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              css={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div data-thumb={!!data.thumbnail} className="content">
          <div className="meta">
            {category && <Category readOnly>{category}</Category>}
            <span className="date">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </span>
            {viewsEnabled && typeof viewCount === "number" && (
              <ViewCount
                slug={data.slug}
                count={viewCount}
                enabled={viewsEnabled}
                compact
              />
            )}
          </div>
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          {data.summary && <p className="summary">{data.summary}</p>}
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: block;

  article {
    overflow: hidden;
    position: relative;
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray3};
    transition: border-color 180ms ease, box-shadow 180ms ease,
      transform 180ms ease;

    @media (min-width: 768px) {
      margin-bottom: 1.25rem;
    }

    :hover {
      border-color: ${({ theme }) => theme.colors.gray7};
      box-shadow: ${({ theme }) =>
        theme.scheme === "light"
          ? "0 14px 36px rgba(0, 0, 0, 0.08)"
          : "0 14px 36px rgba(0, 0, 0, 0.24)"};
      transform: translateY(-1px);
    }

    > .thumbnail {
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      padding-bottom: 66%;

      @media (min-width: 1024px) {
        padding-bottom: 46%;
      }
    }
    > .content {
      padding: 1rem;
      min-width: 0;

      &[data-thumb="false"] {
        padding-top: 1rem;
      }

      > .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.75rem;

        .date {
          color: ${({ theme }) => theme.colors.gray10};
          font-size: 0.8125rem;
          line-height: 1.125rem;
        }
      }
      > .top {
        min-width: 0;

        h2 {
          font-size: 1.125rem;
          line-height: 1.55rem;
          font-weight: 800;
          letter-spacing: 0;
          cursor: pointer;
          overflow-wrap: anywhere;

          @media (min-width: 768px) {
            font-size: 1.1875rem;
            line-height: 1.75rem;
          }
        }
      }
      > .summary {
        display: -webkit-box;
        margin: 0.5rem 0 0.875rem;
        color: ${({ theme }) => theme.colors.gray11};
        font-size: 0.9375rem;
        line-height: 1.55rem;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        min-width: 0;
      }
    }
  }
`
