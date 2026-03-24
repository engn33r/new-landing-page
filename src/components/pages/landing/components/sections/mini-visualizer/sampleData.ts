import type { OptimizationData, OnChainAction } from './types'

// Color palette for strategies
const STRATEGY_COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
]

// Most recent optimization - WETH vault
export const sampleOptimizationData1: OptimizationData = {
  vault: '0xAc37729B76db6438CE62042AE1270ee574CA7571',
  vaultLabel: 'WETH-2 yVault',
  chainId: 1,
  chainName: 'Mainnet',
  tvl: 45200000,
  tvlUnit: 'USD',
  vaultAprCurrentPct: 3.25,
  vaultAprProposedPct: 4.12,
  vaultAprDeltaPct: 0.87,
  vaultAprDeltaRelativePct: 26.77,
  timestampUtc: '2026-03-24T10:30:00Z',
  strategies: [
    {
      name: 'Aave V3 WETH',
      currentRatioPct: 35.5,
      targetRatioPct: 25.0,
      allocationDeltaPct: -10.5,
      currentAprPct: 3.1,
      targetAprPct: 3.1,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[0],
    },
    {
      name: 'Morpho Blue WETH',
      currentRatioPct: 20.0,
      targetRatioPct: 35.0,
      allocationDeltaPct: 15.0,
      currentAprPct: 4.5,
      targetAprPct: 4.5,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[1],
    },
    {
      name: 'Compound V3 WETH',
      currentRatioPct: 25.0,
      targetRatioPct: 20.0,
      allocationDeltaPct: -5.0,
      currentAprPct: 2.8,
      targetAprPct: 2.8,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[2],
    },
    {
      name: 'Pendle PT-wstETH',
      currentRatioPct: 15.0,
      targetRatioPct: 15.0,
      allocationDeltaPct: 0,
      currentAprPct: 5.2,
      targetAprPct: 5.2,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[3],
    },
    {
      name: 'Gearbox WETH Farm',
      currentRatioPct: 4.5,
      targetRatioPct: 5.0,
      allocationDeltaPct: 0.5,
      currentAprPct: 6.8,
      targetAprPct: 6.8,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[4],
    },
  ],
}

// Second most recent - USDC vault
export const sampleOptimizationData2: OptimizationData = {
  vault: '0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204',
  vaultLabel: 'USDC-1 yVault',
  chainId: 1,
  chainName: 'Mainnet',
  tvl: 89200000,
  tvlUnit: 'USD',
  vaultAprCurrentPct: 5.12,
  vaultAprProposedPct: 6.45,
  vaultAprDeltaPct: 1.33,
  vaultAprDeltaRelativePct: 25.98,
  timestampUtc: '2026-03-23T14:15:00Z',
  strategies: [
    {
      name: 'Aave V3 USDC',
      currentRatioPct: 40.0,
      targetRatioPct: 30.0,
      allocationDeltaPct: -10.0,
      currentAprPct: 4.8,
      targetAprPct: 4.8,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[0],
    },
    {
      name: 'Morpho Blue USDC',
      currentRatioPct: 15.0,
      targetRatioPct: 35.0,
      allocationDeltaPct: 20.0,
      currentAprPct: 7.2,
      targetAprPct: 7.2,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[1],
    },
    {
      name: 'Compound V3 USDC',
      currentRatioPct: 30.0,
      targetRatioPct: 20.0,
      allocationDeltaPct: -10.0,
      currentAprPct: 4.5,
      targetAprPct: 4.5,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[2],
    },
    {
      name: 'Flux USDC Farm',
      currentRatioPct: 10.0,
      targetRatioPct: 10.0,
      allocationDeltaPct: 0,
      currentAprPct: 6.5,
      targetAprPct: 6.5,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[3],
    },
    {
      name: 'Silo USDC',
      currentRatioPct: 5.0,
      targetRatioPct: 5.0,
      allocationDeltaPct: 0,
      currentAprPct: 5.8,
      targetAprPct: 5.8,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[4],
    },
  ],
}

// Third most recent - crvUSD vault
export const sampleOptimizationData3: OptimizationData = {
  vault: '0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F',
  vaultLabel: 'crvUSD yVault',
  chainId: 1,
  chainName: 'Mainnet',
  tvl: 28500000,
  tvlUnit: 'USD',
  vaultAprCurrentPct: 4.85,
  vaultAprProposedPct: 5.92,
  vaultAprDeltaPct: 1.07,
  vaultAprDeltaRelativePct: 22.06,
  timestampUtc: '2026-03-22T09:45:00Z',
  strategies: [
    {
      name: 'Curve crvUSD/USDC',
      currentRatioPct: 45.0,
      targetRatioPct: 35.0,
      allocationDeltaPct: -10.0,
      currentAprPct: 4.2,
      targetAprPct: 4.2,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[0],
    },
    {
      name: 'Aave V3 crvUSD',
      currentRatioPct: 20.0,
      targetRatioPct: 30.0,
      allocationDeltaPct: 10.0,
      currentAprPct: 5.5,
      targetAprPct: 5.5,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[1],
    },
    {
      name: 'Morpho Blue crvUSD',
      currentRatioPct: 25.0,
      targetRatioPct: 30.0,
      allocationDeltaPct: 5.0,
      currentAprPct: 6.8,
      targetAprPct: 6.8,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[2],
    },
    {
      name: 'Prisma crvUSD',
      currentRatioPct: 10.0,
      targetRatioPct: 5.0,
      allocationDeltaPct: -5.0,
      currentAprPct: 8.2,
      targetAprPct: 8.2,
      aprDeltaPct: 0,
      color: STRATEGY_COLORS[3],
    },
  ],
}

// Array of all 3 optimizations
export const sampleOptimizations = [
  sampleOptimizationData1,
  sampleOptimizationData2,
  sampleOptimizationData3,
]

// On-chain actions for each vault
export const sampleOnChainActions1: OnChainAction[] = [
  {
    txHash: '0x8a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    strategyName: 'Morpho Blue WETH',
    deltaToken: 4520000,
    timestamp: '2026-03-24T10:45:00Z',
  },
  {
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    strategyName: 'Aave V3 WETH',
    deltaToken: -3164000,
    timestamp: '2026-03-24T10:42:00Z',
  },
  {
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    strategyName: 'Compound V3 WETH',
    deltaToken: -1582000,
    timestamp: '2026-03-24T10:38:00Z',
  },
  {
    txHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    strategyName: 'Gearbox WETH Farm',
    deltaToken: 226000,
    timestamp: '2026-03-24T10:35:00Z',
  },
]

export const sampleOnChainActions2: OnChainAction[] = [
  {
    txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    strategyName: 'Morpho Blue USDC',
    deltaToken: 8920000,
    timestamp: '2026-03-23T14:30:00Z',
  },
  {
    txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    strategyName: 'Aave V3 USDC',
    deltaToken: -4460000,
    timestamp: '2026-03-23T14:25:00Z',
  },
  {
    txHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',
    strategyName: 'Compound V3 USDC',
    deltaToken: -4460000,
    timestamp: '2026-03-23T14:20:00Z',
  },
]

export const sampleOnChainActions3: OnChainAction[] = [
  {
    txHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',
    strategyName: 'Morpho Blue crvUSD',
    deltaToken: 1425000,
    timestamp: '2026-03-22T10:00:00Z',
  },
  {
    txHash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
    strategyName: 'Curve crvUSD/USDC',
    deltaToken: -1425000,
    timestamp: '2026-03-22T09:55:00Z',
  },
]

// Array of all on-chain actions
export const sampleOnChainActions = [
  sampleOnChainActions1,
  sampleOnChainActions2,
  sampleOnChainActions3,
]
