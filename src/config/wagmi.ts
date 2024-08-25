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
import { getDefaultConfig } from "connectkit";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [base, baseSepolia],
    connectors: [
      coinbaseWallet(),
      // alias({
      //   keysUrl: `${process.env.NEXT_PUBLIC_ALIAS_URL}/wallet`,
      //   appName: "Local App",
      //   appLogoUrl: `${process.env.NEXT_PUBLIC_ALIAS_URL}/vercel.svg`,
      // }),
    ],
    ssr: true,
    // storage: createStorage({
    //   storage: cookieStorage,
    // }),
    transports: {
      [base.id]: http("https://base-rpc.publicnode.com"),
      [baseSepolia.id]: http("https://base-sepolia-rpc.publicnode.com"),
    },
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    appName: "Proof of Drink",
    appDescription: "by Brood.beer",
    appUrl: "https://pod.brood.beer",
    appIcon: "/brood-logo.png",
  })
);
