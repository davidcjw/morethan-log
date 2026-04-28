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
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }

  .list {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 0.25rem;
    overflow: scroll;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    @media (min-width: 1024px) {
      display: block;
    }

    a {
      display: block;
      padding: 0.25rem;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray10};
      flex-shrink: 0;
      cursor: pointer;

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray4};

        :hover {
          background-color: ${({ theme }) => theme.colors.gray4};
        }
      }
    }
  }
`
