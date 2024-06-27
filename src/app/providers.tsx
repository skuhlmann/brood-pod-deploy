'use client'

import { alias } from '@/config/connector';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider, cookieStorage, createConfig, createStorage, custom, http } from 'wagmi'
import { localhost, foundry } from 'wagmi/chains'

const wagmiConfig = createConfig({
  chains: [foundry],
  connectors: [
    alias({
      preference: 'smartWalletOnly',
      keysUrl: `http://localhost:3001/wallet`,
      appName: 'Local App',
      appLogoUrl: 'http://localhost:3001/vercel.svg',
    })
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [foundry.id]: http('http://localhost:8545'),
  }
})

const queryClient = new QueryClient()

export default function Providers({
  children,
  initialState
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined
}>) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}