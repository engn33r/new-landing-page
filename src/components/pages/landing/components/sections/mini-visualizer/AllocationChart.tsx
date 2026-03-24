import { useState, useMemo, useRef, useEffect } from 'react'
import type { OptimizationData } from './types'

interface AllocationChartProps {
  data: OptimizationData
}

export function AllocationChart({ data }: AllocationChartProps) {
  const [hoveredBar, setHoveredBar] = useState<'before' | 'after' | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const strategies = data.strategies
  
  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  
  // Calculate cumulative positions for stacked bars
  const beforeData = useMemo(() => {
    let cumulative = 0
    return strategies.map(s => {
      const start = cumulative
      cumulative += s.currentRatioPct
      return { ...s, start, end: cumulative }
    })
  }, [strategies])
  
  const afterData = useMemo(() => {
    let cumulative = 0
    return strategies.map(s => {
      const start = cumulative
      cumulative += s.targetRatioPct
      return { ...s, start, end: cumulative }
    })
  }, [strategies])
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }
  
  const maxVal = 100
  const barHeight = 32
  const barSpacing = 20
  const labelWidth = 55
  // Responsive chart width based on container
  const minChartWidth = 280
  const maxChartWidth = 600
  const chartWidth = Math.max(minChartWidth, Math.min(maxChartWidth, containerWidth - labelWidth - 16))
  const chartHeight = barHeight * 2 + barSpacing
  
  const scale = (val: number) => (val / maxVal) * chartWidth
  
  const formatPercent = (val: number) => `${val.toFixed(1)}%`
  
  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${labelWidth + chartWidth + 8} ${chartHeight}`}
        className="overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredBar(null)}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Y-axis labels */}
        <text
          x={labelWidth - 10}
          y={barHeight / 2 + 5}
          textAnchor="end"
          className="fill-gray-400 text-xs font-medium"
        >
          Before
        </text>
        <text
          x={labelWidth - 10}
          y={barHeight + barSpacing + barHeight / 2 + 5}
          textAnchor="end"
          className="fill-gray-400 text-xs font-medium"
        >
          After
        </text>
        
        {/* Before bar background */}
        <rect
          x={labelWidth}
          y={0}
          width={chartWidth}
          height={barHeight}
          rx={6}
          className="fill-white/5"
          onMouseEnter={() => setHoveredBar('before')}
        />
        
        {/* After bar background */}
        <rect
          x={labelWidth}
          y={barHeight + barSpacing}
          width={chartWidth}
          height={barHeight}
          rx={6}
          className="fill-white/5"
          onMouseEnter={() => setHoveredBar('after')}
        />
        
        {/* Before bar segments */}
        {beforeData.map((s, i) => (
          <rect
            key={`before-${i}`}
            x={labelWidth + scale(s.start)}
            y={2}
            width={Math.max(0, scale(s.end) - scale(s.start) - 2)}
            height={barHeight - 4}
            rx={4}
            fill={s.color}
            className="transition-opacity duration-150"
            opacity={hoveredBar && hoveredBar !== 'before' ? 0.4 : 1}
            onMouseEnter={() => setHoveredBar('before')}
          />
        ))}
        
        {/* After bar segments */}
        {afterData.map((s, i) => (
          <rect
            key={`after-${i}`}
            x={labelWidth + scale(s.start)}
            y={barHeight + barSpacing + 2}
            width={Math.max(0, scale(s.end) - scale(s.start) - 2)}
            height={barHeight - 4}
            rx={4}
            fill={s.color}
            className="transition-opacity duration-150"
            opacity={hoveredBar && hoveredBar !== 'after' ? 0.4 : 1}
            onMouseEnter={() => setHoveredBar('after')}
          />
        ))}
        
        {/* X-axis labels */}
        {[0, 25, 50, 75, 100].map(tick => (
          <g key={tick}>
            <text
              x={labelWidth + scale(tick)}
              y={chartHeight + 16}
              textAnchor="middle"
              className="fill-gray-500 text-[11px]"
            >
              {tick}%
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend - responsive: 2 columns on mobile, row on desktop */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
        {strategies.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="truncate text-[11px] text-gray-400" title={s.name}>
              {s.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Tooltip */}
      {hoveredBar && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-white/10 bg-gray-900/95 p-3 shadow-xl backdrop-blur-sm"
          style={{
            left: Math.min(tooltipPos.x + 12, chartWidth - 120),
            top: Math.max(tooltipPos.y - 10, 0),
          }}
        >
          <div className="mb-1.5 text-xs font-semibold capitalize text-white">
            {hoveredBar} Optimization
          </div>
          <div className="space-y-1">
            {strategies.map((s, i) => {
              const value = hoveredBar === 'before' ? s.currentRatioPct : s.targetRatioPct
              const delta = hoveredBar === 'after' ? s.allocationDeltaPct : null
              return (
                <div key={i} className="flex items-center gap-2.5 text-[11px]">
                  <div
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="max-w-[110px] truncate text-gray-400">{s.name}</span>
                  <span className="ml-auto font-medium text-white whitespace-nowrap">
                    {formatPercent(value)}
                    {delta !== null && delta !== 0 && (
                      <span className={delta > 0 ? 'text-green-400' : 'text-red-400'}>
                        {' '}({delta > 0 ? '+' : ''}{formatPercent(delta)})
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
