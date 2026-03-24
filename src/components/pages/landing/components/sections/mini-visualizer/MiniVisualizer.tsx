import { useState, useCallback, useEffect } from 'react'
import { AllocationChart } from './AllocationChart'
import { AprSummary } from './AprSummary'
import { OnChainActions } from './OnChainActions'
import { sampleOptimizations, sampleOnChainActions } from './sampleData'

// Inline SVG icons
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatTvl(value: number, unit: string): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B ${unit}`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M ${unit}`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K ${unit}`
  }
  return `$${value.toFixed(2)} ${unit}`
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function MiniVisualizer() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const totalSlides = sampleOptimizations.length
  
  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setActiveSlide((prev) => (prev + 1) % totalSlides)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, totalSlides])
  
  const goToSlide = useCallback((index: number) => {
    if (!isAnimating && index !== activeSlide) {
      setIsAnimating(true)
      setActiveSlide(index)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, activeSlide])
  
  // Auto-rotate every 12 seconds when not hovering
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        nextSlide()
      }
    }, 12000)
    
    return () => clearInterval(interval)
  }, [isHovering, nextSlide])
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {sampleOptimizations.map((optimization, index) => (
            <div 
              key={optimization.vault}
              className="w-full flex-shrink-0 px-0"
            >
              <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-400">
                        {index === 0 ? 'Latest' : index === 1 ? '2nd' : '3rd'} Optimization
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {optimization.chainName}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {optimization.vaultLabel}
                    </h3>
                    <a
                      href={`https://yearn.fi/v3/${optimization.chainId}/${optimization.vault}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      {formatAddress(optimization.vault)}
                      <ExternalLinkIcon />
                    </a>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-0.5">TVL</div>
                    <div className="text-sm font-semibold text-white">
                      {formatTvl(optimization.tvl, optimization.tvlUnit)}
                    </div>
                  </div>
                </div>
                
                {/* APR Summary */}
                <div className="mb-4">
                  <AprSummary data={optimization} />
                </div>
                
                {/* Allocation Chart */}
                <div className="mb-4">
                  <div className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 font-medium">
                    Strategy Allocation
                  </div>
                  <AllocationChart data={optimization} />
                </div>
                
                {/* On-chain Actions */}
                <OnChainActions data={optimization} actions={sampleOnChainActions[index]} />
                
                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <span className="text-[11px] text-gray-500">
                    Optimized: {formatDate(optimization.timestampUtc)}
                  </span>
                  <a
                    href="https://visual.yearn.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Full Details
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex w-full justify-center mt-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="flex size-8 items-center justify-center rounded-full transition-all duration-300 sm:size-6"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`size-2.5 rounded-full transition-all duration-300 sm:size-2 ${
                  index === activeSlide ? 'scale-125 bg-white' : 'bg-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
