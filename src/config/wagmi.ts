import { connector as alias } from 'alias-wallet';
import {
  cookieStorage, 
  createConfig, 
  createStorage, 
  http
} from 'wagmi'
import {
  sepolia, 
  optimismSepolia, 
  baseSepolia, 
  arbitrumSepolia, 
  foundry, 
} from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [
    sepolia,
    optimismSepolia,
    baseSepolia,
    arbitrumSepolia,
    foundry, 
  ],
  connectors: [
    alias({
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
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    [optimismSepolia.id]: http('https://optimism-sepolia-rpc.publicnode.com'),
    [baseSepolia.id]: http('https://base-sepolia-rpc.publicnode.com'),
    [arbitrumSepolia.id]: http('https://arbitrum-sepolia-rpc.publicnode.com'),
    [foundry.id]: http('http://localhost:8545'),
  }
})