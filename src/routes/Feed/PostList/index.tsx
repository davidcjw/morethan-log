import { useRouter } from "next/router"
import React, { useEffect, useMemo, useRef, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import useViewCounts from "src/hooks/useViewCounts"
import styled from "@emotion/styled"

const POSTS_PER_PAGE = 10

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const listRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  const filteredPosts = useMemo(() => {
    let newFilteredPosts = [...data]
    // keyword
    newFilteredPosts = newFilteredPosts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : ""
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(q.toLowerCase())
    })

    // tag
    if (currentTag) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) => post && post.tags && post.tags.includes(currentTag)
      )
    }

    // category
    if (currentCategory !== DEFAULT_CATEGORY) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) =>
          post && post.category && post.category.includes(currentCategory)
      )
    }
    // order
    if (currentOrder !== "desc") {
      newFilteredPosts = newFilteredPosts.reverse()
    }

    return newFilteredPosts
  }, [data, q, currentTag, currentCategory, currentOrder])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const firstPostNumber = filteredPosts.length
    ? (currentPage - 1) * POSTS_PER_PAGE + 1
    : 0
  const lastPostNumber = Math.min(
    currentPage * POSTS_PER_PAGE,
    filteredPosts.length
  )
  const paginatedPosts = useMemo(
    () =>
      filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
      ),
    [currentPage, filteredPosts]
  )
  const visibleSlugs = useMemo(
    () => paginatedPosts.map((post) => post.slug),
    [paginatedPosts]
  )
  const viewCounts = useViewCounts(visibleSlugs)

  useEffect(() => {
    setPage(1)
  }, [q, currentTag, currentCategory, currentOrder])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    window.requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <StyledWrapper ref={listRef}>
      <div className="list-meta">
        <span>
          {filteredPosts.length
            ? `${firstPostNumber}-${lastPostNumber} of ${filteredPosts.length} posts`
            : "No posts"}
        </span>
      </div>
      <div className="posts">
        {!filteredPosts.length && (
          <p className="empty">No guides match those filters yet.</p>
        )}
        {paginatedPosts.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            viewCount={viewCounts.counts[post.slug]}
            viewsEnabled={viewCounts.enabled && viewCounts.loaded}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Post pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </StyledWrapper>
  )
}

export default PostList

const StyledWrapper = styled.div`
  margin-top: 0.25rem;
  scroll-margin-top: 5rem;
  min-width: 0;

  .list-meta {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.625rem;
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 0.8125rem;
    line-height: 1.125rem;
  }

  .posts {
    min-height: 20rem;
  }

  .empty {
    margin: 0;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.9375rem;
    line-height: 1.5rem;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray6};
    padding-top: 1rem;
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 0.875rem;
    line-height: 1.25rem;

    button {
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 0.625rem 0.75rem;
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "white" : theme.colors.gray3};
      color: ${({ theme }) => theme.colors.gray11};
      font-weight: 700;
      cursor: pointer;

      :hover:not(:disabled) {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray3};
      }

      :disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
    }
  }
`
