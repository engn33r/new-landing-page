import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import LandingPage from '@pages/landing'

const queryClient = new QueryClient()

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={'font-aeonik size-full min-h-screen'}>
        <LandingPage />
      </main>
    </QueryClientProvider>
  )
}

export default App
