import { base, baseSepolia } from "viem/chains";

export const PROD_MODE =
  process.env.PROD_MODE && process.env.PROD_MODE.toLowerCase() === "true";

export const POD_CONTRACT_ADDRESS =
  "0x2b530b015a096267d71ed54d797238479e817ab5";
export const CHAIN_ID = PROD_MODE ? base.id : baseSepolia.id;

type TokenConfig = { name: string; tokenId: string };
export const TOKEN_CONFIG: Record<string, TokenConfig> = {
  "1": {
    name: "hotdog",
    tokenId: "1",
  },
  "2": {
    name: "decent-raid-guild",
    tokenId: "2",
  },
  "3": {
    name: "tw",
    tokenId: "3",
  },
};
export const getTokenIdFromName = (name: string) => {
  const config = Object.keys(TOKEN_CONFIG).find((id) => {
    return TOKEN_CONFIG[id].name === name;
  });
  return config && TOKEN_CONFIG[config].tokenId;
};
