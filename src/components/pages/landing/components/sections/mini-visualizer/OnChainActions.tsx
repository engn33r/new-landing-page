import { useState } from 'react'
import type { OptimizationData, OnChainAction } from './types'

interface OnChainActionsProps {
  data: OptimizationData
  actions: OnChainAction[]
}

// Inline SVG icons
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

function getTxExplorerUrl(chainId: number, txHash: string): string {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${txHash}`
    case 42161:
      return `https://arbiscan.io/tx/${txHash}`
    case 8453:
      return `https://basescan.org/tx/${txHash}`
    default:
      return `https://etherscan.io/tx/${txHash}`
  }
}

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatDeltaToken(deltaToken: number, tvlUnit: string): string {
  const abs = Math.abs(deltaToken)
  const sign = deltaToken >= 0 ? '+' : '-'
  
  let formatted: string
  if (abs >= 1_000_000) {
    formatted = `${(abs / 1_000_000).toFixed(2)}M`
  } else if (abs >= 1_000) {
    formatted = `${(abs / 1_000).toFixed(2)}K`
  } else {
    formatted = abs.toFixed(2)
  }
  
  return `${sign}${formatted} ${tvlUnit}`
}

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

export function OnChainActions({ data, actions }: OnChainActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (actions.length === 0) {
    return null
  }
  
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">On-chain Actions</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-gray-400">
            {actions.length}
          </span>
        </div>
        <span className="text-gray-500">
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>
      
      {isExpanded && (
        <div className="border-t border-white/10">
          <div className="max-h-[140px] overflow-y-auto">
            {actions.map((action, index) => {
              const isIncrease = action.deltaToken >= 0
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 last:border-0 hover:bg-white/5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={getTxExplorerUrl(data.chainId, action.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-[11px] text-blue-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {formatAddress(action.txHash)}
                        <ExternalLinkIcon />
                      </a>
                      <span className="text-[10px] text-gray-600">
                        {formatTimeAgo(action.timestamp)}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-[10px] text-gray-500">
                      {action.strategyName}
                    </div>
                  </div>
                  <div className={`text-right text-[11px] font-medium ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
                    {formatDeltaToken(action.deltaToken, data.tvlUnit)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
