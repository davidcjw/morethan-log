import { CONFIG } from "site.config"
import Tag from "src/components/Tag"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostHeader: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper>
      <h1 className="title">{data.title}</h1>
      {data.type[0] !== "Paper" && (
        <nav>
          <div className="top">
            {data.author && data.author[0] && data.author[0].name && (
              <>
                <div className="author">
                  <Image
                    css={{ borderRadius: "50%" }}
                    src={data.author[0].profile_photo || CONFIG.profile.image}
                    alt="profile_photo"
                    width={24}
                    height={24}
                  />
                  <div className="">{data.author[0].name}</div>
                </div>
                <div className="hr"></div>
              </>
            )}
            <div className="date">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="mid">
            {data.tags && (
              <div className="tags">
                {data.tags.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
          {data.thumbnail && (
            <div className="thumbnail">
              <Image
                src={data.thumbnail}
                css={{ objectFit: "cover" }}
                fill
                alt={data.title}
              />
            </div>
          )}
        </nav>
      )}
    </StyledWrapper>
  )
}

export default PostHeader

const StyledWrapper = styled.div`
  .title {
    font-size: 2rem;
    line-height: 2.35rem;
    font-weight: 850;
    letter-spacing: 0;
    overflow-wrap: anywhere;
    word-break: break-word;

    @media (max-width: 480px) {
      font-size: 1.55rem;
      line-height: 1.9rem;
    }
  }
  nav {
    margin-top: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.gray11};
    > .top {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.875rem;
      gap: 0.5rem 0.75rem;
      align-items: center;
      font-size: 0.875rem;
      line-height: 1.25rem;
      .author {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .hr {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        align-self: stretch;
        width: 1px;
        background-color: ${({ theme }) => theme.colors.gray10};
      }
      .date {
        margin-right: 0.5rem;

        @media (min-width: 768px) {
          margin-left: 0;
        }
      }
    }
    > .mid {
      display: flex;
      margin-bottom: 1rem;
      align-items: center;
      min-width: 0;
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        max-width: 100%;
        min-width: 0;
      }
    }
    .thumbnail {
      overflow: hidden;
      position: relative;
      margin-bottom: 1.75rem;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray4};
      padding-bottom: 66%;

      @media (min-width: 1024px) {
        padding-bottom: 50%;
      }
    }
  }
`
