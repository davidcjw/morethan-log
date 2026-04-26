const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504])

type NotionRequestOptions = {
  maxRetries?: number
  initialDelayMs?: number
  maxDelayMs?: number
  queueDelayMs?: number
}

let requestQueue = Promise.resolve()

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getErrorStatus(error: unknown): number | undefined {
  const err = error as {
    status?: number
    statusCode?: number
    response?: { status?: number }
  }

  return err?.status ?? err?.statusCode ?? err?.response?.status
}

function isRetryableNotionError(error: unknown) {
  const status = getErrorStatus(error)
  return !status || RETRYABLE_STATUS_CODES.has(status)
}

function getDelayMs(
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number
) {
  const delay = Math.min(initialDelayMs * 2 ** attempt, maxDelayMs)
  return delay + Math.floor(Math.random() * 250)
}

async function enqueueRequest<T>(
  request: () => Promise<T>,
  queueDelayMs: number
) {
  const result = requestQueue.then(request, request)

  requestQueue = result.catch(() => undefined).then(() => sleep(queueDelayMs))

  return result
}

export async function runNotionRequest<T>(
  label: string,
  request: () => Promise<T>,
  {
    maxRetries = 5,
    initialDelayMs = 1500,
    maxDelayMs = 30000,
    queueDelayMs = 350,
  }: NotionRequestOptions = {}
) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await enqueueRequest(request, queueDelayMs)
    } catch (error) {
      if (attempt === maxRetries || !isRetryableNotionError(error)) {
        throw error
      }

      const delayMs = getDelayMs(attempt, initialDelayMs, maxDelayMs)
      console.warn(`Notion request "${label}" failed; retrying in ${delayMs}ms`)
      await sleep(delayMs)
    }
  }

  throw new Error(`Notion request "${label}" failed`)
}
