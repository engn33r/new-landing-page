class FetcherError extends Error {
  response?: { status: number }
  status?: number
  url?: string

  constructor(message: string, options?: { status?: number; url?: string }) {
    super(message)
    this.name = 'FetcherError'
    if (options?.status !== undefined) {
      this.status = options.status
      this.response = { status: options.status }
    }
    if (options?.url) {
      this.url = options.url
    }
  }
}

async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}): Promise<Response> {
  const { timeout = 15000, ...fetchOptions } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await globalThis.fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...fetchOptions.headers
      }
    })
    return response
  } finally {
    clearTimeout(id)
  }
}

export async function baseFetcher<T>(url: string): Promise<T> {
  const response = await fetchWithTimeout(url)
  if (!response.ok) {
    throw new FetcherError(`HTTP error: ${response.status}`, { status: response.status, url })
  }

  try {
    return (await response.json()) as T
  } catch {
    const status = response.status || 0
    throw new FetcherError('Invalid JSON response', { status, url })
  }
}
