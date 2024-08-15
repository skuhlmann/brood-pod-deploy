import { connector as alias } from "alias-wallet";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import {
  sepolia,
  optimismSepolia,
  baseSepolia,
  arbitrumSepolia,
  foundry,
  mainnet,
  base,
} from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [
    mainnet,
    base,
    sepolia,
    optimismSepolia,
    baseSepolia,
    arbitrumSepolia,
    foundry,
  ],
  connectors: [
    alias({
      keysUrl: `${process.env.NEXT_PUBLIC_ALIAS_URL}/wallet`,
      appName: "Local App",
      appLogoUrl: `${process.env.NEXT_PUBLIC_ALIAS_URL}/vercel.svg`,
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http("https://ethereum-rpc.publicnode.com	"),
    [base.id]: http("https://base-rpc.publicnode.com"),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [optimismSepolia.id]: http("https://optimism-sepolia-rpc.publicnode.com"),
    [baseSepolia.id]: http("https://base-sepolia-rpc.publicnode.com"),
    [arbitrumSepolia.id]: http("https://arbitrum-sepolia-rpc.publicnode.com"),
    [foundry.id]: http("http://localhost:8545"),
  },
});
