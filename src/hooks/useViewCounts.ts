import { useEffect, useMemo, useState } from "react"

type ViewCountsState = {
  counts: Record<string, number>
  enabled: boolean
  loaded: boolean
}

type ViewsResponse = {
  counts?: Record<string, number>
  enabled?: boolean
}

const countCache = new Map<string, number>()
let cachedEnabled = true

function getCachedCounts(slugs: string[]) {
  return slugs.reduce<Record<string, number>>((acc, slug) => {
    const count = countCache.get(slug)
    if (typeof count === "number") acc[slug] = count
    return acc
  }, {})
}

const useViewCounts = (slugs: string[]) => {
  const normalizedSlugs = useMemo(
    () => Array.from(new Set(slugs.filter(Boolean))),
    [slugs]
  )
  const [state, setState] = useState<ViewCountsState>({
    counts: {},
    enabled: cachedEnabled,
    loaded: false,
  })

  useEffect(() => {
    let mounted = true

    if (!normalizedSlugs.length) {
      setState({ counts: {}, enabled: cachedEnabled, loaded: true })
      return
    }

    const cachedCounts = getCachedCounts(normalizedSlugs)
    const missingSlugs = normalizedSlugs.filter((slug) => !countCache.has(slug))

    if (!missingSlugs.length || !cachedEnabled) {
      setState({
        counts: cachedCounts,
        enabled: cachedEnabled,
        loaded: true,
      })
      return
    }

    setState({
      counts: cachedCounts,
      enabled: cachedEnabled,
      loaded: false,
    })

    const params = missingSlugs.map(encodeURIComponent).join(",")

    fetch(`/api/views?slugs=${params}`)
      .then((response) => response.json())
      .then((data: ViewsResponse) => {
        if (!mounted) return

        const nextEnabled = data.enabled !== false
        cachedEnabled = nextEnabled

        if (data.counts) {
          Object.entries(data.counts).forEach(([slug, count]) => {
            countCache.set(slug, count)
          })
        }

        setState({
          counts: getCachedCounts(normalizedSlugs),
          enabled: nextEnabled,
          loaded: true,
        })
      })
      .catch(() => {
        if (!mounted) return
        cachedEnabled = false
        setState({
          counts: cachedCounts,
          enabled: false,
          loaded: true,
        })
      })

    return () => {
      mounted = false
    }
  }, [normalizedSlugs])

  return state
}

export default useViewCounts
