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

    a,
    button {
      display: flex;
      gap: 0.375rem;
      align-items: center;
      justify-content: space-between;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 0.5rem 0.625rem;
      background-color: transparent;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
      cursor: pointer;
      font-family: inherit;
      text-align: left;
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

      .count {
        color: ${({ theme }) => theme.colors.gray9};
        font-size: 0.75rem;
        line-height: 1rem;
        flex: 0 0 auto;
      }
    }

    button {
      color: ${({ theme }) => theme.colors.blue11};
      font-weight: 700;
    }
  }
`
