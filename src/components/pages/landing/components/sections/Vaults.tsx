import type { FC } from 'react'
import { SectionHeader } from '@shared/components/SectionHeader'
import { MiniVisualizer } from './mini-visualizer'

export const Vaults: FC = () => {
  return (
    <section className={'flex w-full justify-center border-t border-white/10 px-4 py-12 sm:py-16 md:px-8 lg:py-32'}>
      <div className={'w-full md:w-[90%] lg:w-[80%] max-w-[1400px]'}>
        <div className={'px-1 sm:px-2 mb-8 sm:mb-10 md:mb-12'}>
          <SectionHeader
            align={'center'}
            tagline={'Verifiable DeFi'}
            title={'Optimizing Yield 24/7'}
            description={'Real-time allocation optimization across strategies to maximize your APY'}
          />
        </div>
        <MiniVisualizer />
      </div>
    </section>
  )
}
