import type { OptimizationData } from './types'

interface AprSummaryProps {
  data: OptimizationData
}

// Inline SVG icons
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
)

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function AprCard({ 
  title, 
  value, 
  subtitle, 
  variant 
}: { 
  title: string
  value: number
  subtitle?: string
  variant: 'before' | 'after' | 'delta'
}) {
  const isPositive = value >= 0
  const isDelta = variant === 'delta'
  
  const bgClass = {
    before: 'bg-white/5 border-white/10',
    after: 'bg-blue-500/10 border-blue-500/20',
    delta: isPositive 
      ? 'bg-green-500/10 border-green-500/20' 
      : value < 0 
        ? 'bg-red-500/10 border-red-500/20'
        : 'bg-white/5 border-white/10',
  }[variant]
  
  const textClass = {
    before: 'text-white',
    after: 'text-blue-400',
    delta: isPositive 
      ? 'text-green-400' 
      : value < 0 
        ? 'text-red-400'
        : 'text-gray-400',
  }[variant]
  
  return (
    <div className={`rounded-xl border p-2.5 ${bgClass}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wide text-gray-500">
          {title}
        </span>
        {isDelta && (
          <span className={textClass}>
            {isPositive ? <TrendingUpIcon /> : value < 0 ? <TrendingDownIcon /> : <MinusIcon />}
          </span>
        )}
      </div>
      <div className={`text-xl font-bold ${textClass}`}>
        {formatPercent(value)}
      </div>
      {subtitle && (
        <div className="text-[10px] text-gray-500">
          {subtitle}
        </div>
      )}
    </div>
  )
}

export function AprSummary({ data }: AprSummaryProps) {
  const relativeText = `${data.vaultAprDeltaRelativePct >= 0 ? '+' : ''}${data.vaultAprDeltaRelativePct.toFixed(1)}% relative`
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <AprCard
        title="Before"
        value={data.vaultAprCurrentPct}
        variant="before"
      />
      <AprCard
        title="After"
        value={data.vaultAprProposedPct}
        variant="after"
      />
      <AprCard
        title="Change"
        value={data.vaultAprDeltaPct}
        subtitle={relativeText}
        variant="delta"
      />
    </div>
  )
}
