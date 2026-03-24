export function formatAmount(
  amount: number | string,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  displayDigits = 0,
  options?: {
    locales?: string[]
  }
): string {
  let locale = 'en-US'
  if (typeof navigator !== 'undefined') {
    locale = navigator.language || 'fr-FR'
  }
  const locales = []
  if (options?.locales) {
    locales.push(...options.locales)
  }
  locales.push('en-US')
  locales.push(locale)
  if (maximumFractionDigits < minimumFractionDigits) {
    maximumFractionDigits = minimumFractionDigits
  }
  if (!amount) {
    amount = 0
  }
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  if (Number.isNaN(amount)) {
    amount = 0
  }
  let formattedAmount = new Intl.NumberFormat(locales, {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount)

  if (displayDigits > 0 && formattedAmount.length > displayDigits) {
    const leftSide = formattedAmount.slice(0, Math.ceil(displayDigits / 2))
    const rightSide = formattedAmount.slice(-Math.floor(displayDigits / 2))
    formattedAmount = `${leftSide}...${rightSide}`
  }

  return formattedAmount
}

function resolveLocales(options?: { locales?: string[] }): string[] {
  let locale = 'en-US'
  if (typeof navigator !== 'undefined') {
    locale = navigator.language || 'fr-FR'
  }
  const locales = []
  if (options?.locales) {
    locales.push(...options.locales)
  }
  locales.push('en-US')
  locales.push(locale)
  return locales
}

function formatToSignificantDigits(value: number, significantDigits = 3): string {
  return new Intl.NumberFormat(resolveLocales(), {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: significantDigits
  }).format(value)
}

export function formatPercent(n: number, min?: number, max?: number, upperLimit = 500): string {
  const safeN = Number.isFinite(n) ? n : 0
  const hasFixedPrecisionOverride = min !== undefined || max !== undefined
  const resolvedMin = min ?? 2
  const resolvedMax = max ?? 2

  if (safeN >= upperLimit) {
    return hasFixedPrecisionOverride
      ? `≥ ${formatAmount(upperLimit, resolvedMin, resolvedMax)}%`
      : `≥ ${formatToSignificantDigits(upperLimit)}%`
  }
  return hasFixedPrecisionOverride
    ? `${formatAmount(safeN, resolvedMin, resolvedMax)}%`
    : `${formatToSignificantDigits(safeN)}%`
}
