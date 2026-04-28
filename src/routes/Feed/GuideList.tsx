import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Emoji } from "src/components/Emoji"
import { HUB_LIST } from "src/libs/hub-config"

type Props = {}

const GuideList: React.FC<Props> = () => {
  const router = useRouter()
  const currentPath = router.asPath.split("?")[0]

  return (
    <StyledWrapper>
      <div className="top">
        <Emoji>📚</Emoji> Guides
      </div>
      <div className="list">
        {HUB_LIST.map((hub) => {
          const href = `/${hub.slug}`

          return (
            <Link key={hub.slug} href={href} data-active={href === currentPath}>
              {hub.title}
            </Link>
          )
        })}
      </div>
    </StyledWrapper>
  )
}

export default GuideList

const StyledWrapper = styled.div`
  .top {
    margin-bottom: 0.625rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 800;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    gap: 0.5rem;
    overflow: visible;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    @media (min-width: 1024px) {
      display: grid;
      gap: 0.375rem;
    }

    a {
      display: block;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 0.5rem 0.625rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
      cursor: pointer;
      min-width: 0;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
        border-color: ${({ theme }) => theme.colors.gray7};
        background-color: ${({ theme }) => theme.colors.gray3};
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.blue11};
        border-color: ${({ theme }) => theme.colors.blue7};
        background-color: ${({ theme }) => theme.colors.blue4};

        :hover {
          background-color: ${({ theme }) => theme.colors.blue4};
        }
      }
    }
  }
`
