# Yearn Landing Page

Standalone copy of the yearn.fi landing page for design experimentation.

## Quick Start

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

## What's Included

- All 7 landing page sections: Hero, Vaults, Security, Partners, Integrations, FAQs, Footer
- Live TVL fetched from DefiLlama API
- All original assets and styling (Tailwind CSS, midnight theme)
- Responsive layout (mobile + desktop)

## What's Stripped

- Web3 wallet connection (wagmi, RainbowKit, ethers)
- Full routing (portfolio, vault detail pages, etc.)
- Plausible analytics (stubbed as no-op)
- Vault APR data from on-chain (static labels shown instead)
- Header navigation and wallet UI

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- TanStack React Query (for TVL fetch)
- React Router (for internal Link component)
