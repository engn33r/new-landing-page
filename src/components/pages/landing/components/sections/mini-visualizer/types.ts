export interface Strategy {
  name: string
  currentRatioPct: number
  targetRatioPct: number
  allocationDeltaPct: number
  currentAprPct: number | null
  targetAprPct: number | null
  aprDeltaPct: number | null
  color: string
}

export interface OptimizationData {
  vault: string
  vaultLabel: string
  chainId: number
  chainName: string
  tvl: number
  tvlUnit: string
  vaultAprCurrentPct: number
  vaultAprProposedPct: number
  vaultAprDeltaPct: number
  vaultAprDeltaRelativePct: number
  strategies: Strategy[]
  timestampUtc: string
}

export interface OnChainAction {
  txHash: string
  strategyName: string
  deltaToken: number
  timestamp: string
}
