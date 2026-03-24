type ClassValue = string | null | undefined | Record<string, boolean | undefined>

export function cl(...classes: ClassValue[]): string {
  const tokens: string[] = []

  for (const entry of classes) {
    if (!entry) {
      continue
    }

    if (typeof entry === 'string') {
      tokens.push(entry)
      continue
    }

    Object.entries(entry).forEach(([className, shouldInclude]) => {
      if (shouldInclude) {
        tokens.push(className)
      }
    })
  }

  return tokens.join(' ')
}
