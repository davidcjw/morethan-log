import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import { Emoji } from "src/components/Emoji"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const VISIBLE_TAG_COUNT = 10

const TagList: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag =
    typeof router.query.tag === "string" ? router.query.tag : undefined
  const data = useTagsQuery()
  const [expanded, setExpanded] = useState(false)
  const sortedTags = useMemo(
    () =>
      Object.entries(data).sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]
        return a[0].localeCompare(b[0])
      }),
    [data]
  )
  const visibleTags = expanded
    ? sortedTags
    : sortedTags.slice(0, VISIBLE_TAG_COUNT)
  const hasMoreTags = sortedTags.length > VISIBLE_TAG_COUNT
  const hiddenTagCount = Math.max(0, sortedTags.length - VISIBLE_TAG_COUNT)
  const currentTagVisible = visibleTags.some(([tag]) => tag === currentTag)

  const handleClickTag = (value: any) => {
    // delete
    if (currentTag === value) {
      router.push({
        query: {
          ...router.query,
          tag: undefined,
        },
      })
    }
    // add
    else {
      router.push({
        query: {
          ...router.query,
          tag: value,
        },
      })
    }
  }

  useEffect(() => {
    if (currentTag && !currentTagVisible) {
      setExpanded(true)
    }
  }, [currentTag, currentTagVisible])

  return (
    <StyledWrapper>
      <div className="top">
        <Emoji>🏷️</Emoji> Tags
      </div>
      <div className="list">
        {visibleTags.map(([key, count]) => (
          <a
            key={key}
            data-active={key === currentTag}
            onClick={() => handleClickTag(key)}
          >
            <span>{key}</span>
            <span className="count">{count}</span>
          </a>
        ))}
        {hasMoreTags && (
          <button type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? "Show fewer" : `Show ${hiddenTagCount} more`}
          </button>
        )}
      </div>
    </StyledWrapper>
  )
}

export default TagList

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

    a,
    button {
      display: block;
      padding: 0.25rem;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
      border: 0;
      border-radius: 0.75rem;
      background: transparent;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray10};
      flex-shrink: 0;
      cursor: pointer;
      font-family: inherit;
      text-align: left;

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

      .count {
        margin-left: 0.5rem;
        color: ${({ theme }) => theme.colors.gray9};
        font-size: 0.75rem;
        line-height: 1rem;
      }
    }

    button {
      color: ${({ theme }) => theme.colors.blue11};
      font-weight: 700;
    }
  }
`
