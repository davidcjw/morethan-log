import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { FiEye } from "react-icons/fi"

type ViewState = {
  count: number
  enabled: boolean
  loaded: boolean
}

type ViewResponse = {
  count?: number
  counts?: Record<string, number>
  enabled?: boolean
}

type Props = {
  slug: string
  count?: number
  enabled?: boolean
  increment?: boolean
  compact?: boolean
  className?: string
}

const viewCache = new Map<string, ViewState>()
const viewRequests = new Map<string, Promise<ViewState>>()

function formatCount(count: number) {
  return new Intl.NumberFormat("en", {
    notation: count >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count)
}

async function loadView(slug: string, increment: boolean) {
  const cacheKey = `${increment ? "post" : "get"}:${slug}`
  const cached = viewCache.get(cacheKey)
  if (cached) return cached

  const pending = viewRequests.get(cacheKey)
  if (pending) return pending

  const request = fetch(
    increment
      ? `/api/views/${encodeURIComponent(slug)}`
      : `/api/views?slugs=${encodeURIComponent(slug)}`,
    {
      method: increment ? "POST" : "GET",
    }
  )
    .then((response) => response.json())
    .then((data: ViewResponse) => {
      const count =
        typeof data.count === "number"
          ? data.count
          : typeof data.counts?.[slug] === "number"
          ? data.counts[slug]
          : 0
      const state = {
        count,
        enabled: data.enabled !== false,
        loaded: true,
      }
      viewCache.set(cacheKey, state)
      return state
    })
    .catch(() => {
      const state = {
        count: 0,
        enabled: false,
        loaded: true,
      }
      viewCache.set(cacheKey, state)
      return state
    })

  viewRequests.set(cacheKey, request)
  return request
}

const ViewCount: React.FC<Props> = ({
  slug,
  count,
  enabled,
  increment = false,
  compact = false,
  className,
}) => {
  const [state, setState] = useState<ViewState>({
    count: count ?? 0,
    enabled: enabled ?? typeof count === "number",
    loaded: typeof count === "number",
  })

  useEffect(() => {
    if (typeof count !== "number") return

    setState({
      count,
      enabled: enabled !== false,
      loaded: true,
    })
  }, [count, enabled])

  useEffect(() => {
    let mounted = true

    if (typeof count === "number") return

    loadView(slug, increment).then((nextState) => {
      if (mounted) setState(nextState)
    })

    return () => {
      mounted = false
    }
  }, [count, increment, slug])

  if (!state.loaded || !state.enabled) return null

  return (
    <StyledWrapper
      className={className}
      data-compact={compact}
      aria-label={`${state.count} ${state.count === 1 ? "view" : "views"}`}
    >
      <FiEye className="icon" aria-hidden="true" />
      <span>
        {formatCount(state.count)} {state.count === 1 ? "view" : "views"}
      </span>
    </StyledWrapper>
  )
}

export default ViewCount

const StyledWrapper = styled.span`
  display: inline-flex;
  gap: 0.375rem;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.gray10};
  font-size: 0.875rem;
  line-height: 1.25rem;

  &[data-compact="true"] {
    font-size: 0.8125rem;
    line-height: 1.125rem;
  }

  .icon {
    flex: 0 0 auto;
  }
`
