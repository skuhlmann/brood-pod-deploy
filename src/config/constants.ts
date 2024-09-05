import { base, baseSepolia } from "viem/chains";

export const PROD_MODE =
  process.env.PROD_MODE && process.env.PROD_MODE.toLowerCase() === "true";

export const POD_CONTRACT_ADDRESS =
  "0x2b530b015a096267d71ed54d797238479e817ab5";
export const CHAIN_ID = PROD_MODE ? base.id : baseSepolia.id;
