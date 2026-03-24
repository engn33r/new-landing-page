import type { QueryKey, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { z } from 'zod'
import { baseFetcher } from '../utils/fetchers'

type TUseZodProps<T> = {
  endpoint: string | null
  schema: z.Schema<T>
  config?: Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey' | 'queryFn' | 'enabled'> & {
    enabled?: boolean
    cacheDuration?: number
    shouldEnableRefreshInterval?: boolean
    refreshInterval?: number
    maxRetries?: number
    keepPreviousData?: boolean
  }
}

export type TFetchQueryKey = ['fetch', string]

export async function fetchWithSchema<T>(endpoint: string, schema: z.Schema<T>): Promise<T> {
  const data = await baseFetcher<T>(endpoint)
  const parsedData = schema.safeParse(data)

  if (!parsedData.success) {
    console.error(`[useFetch] Schema validation failed for ${endpoint}:`, parsedData.error)
    throw new Error('Schema validation failed')
  }

  return parsedData.data
}

export function useFetch<T>({ endpoint, schema, config }: TUseZodProps<T>): UseQueryResult<T, Error> {
  const {
    cacheDuration = 2 * 60 * 1000,
    shouldEnableRefreshInterval = false,
    refreshInterval = 30 * 1000,
    maxRetries = 3,
    keepPreviousData: keepPreviousDataFlag = true,
    enabled: enabledOverride,
    retry,
    retryDelay,
    ...queryConfig
  } = config ?? {}

  const queryKey: TFetchQueryKey = ['fetch', endpoint ?? 'disabled']
  const isEnabled = Boolean(endpoint) && (enabledOverride ?? true)
  const shouldRetry =
    retry ??
    // biome-ignore lint/suspicious/noExplicitAny: matching original
    ((failureCount: number, err: unknown): boolean => {
      const anyErr = err as any
      const status = (anyErr?.response?.status as number | undefined) ?? (anyErr?.status as number | undefined)
      const code = anyErr?.code as string | undefined
      const isNetworkLike = code === 'ERR_NETWORK' || (!anyErr?.response && anyErr?.request)
      if (isNetworkLike) return false
      if (typeof status === 'number' && status >= 400 && status < 500) return false
      return failureCount < maxRetries
    })

  const resolvedRetryDelay =
    retryDelay ??
    ((failureCount: number): number => {
      return Math.min(1000 * 2 ** failureCount, 15000)
    })

  const result = useQuery<T, Error>({
    queryKey,
    enabled: isEnabled,
    queryFn: () => fetchWithSchema(endpoint as string, schema),
    staleTime: cacheDuration,
    refetchInterval: shouldEnableRefreshInterval ? refreshInterval : false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousDataFlag ? keepPreviousData : undefined,
    retry: shouldRetry,
    retryDelay: resolvedRetryDelay,
    ...queryConfig
  })

  if (result.error) {
    console.error(`[useFetch] Error fetching ${endpoint}:`, result.error)
  }

  return result
}
