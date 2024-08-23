import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
export const gatewayImagePath = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("ipfs://")[1]}`;
};
export const gatewayImagePathTemp = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("/ipfs/")[1]}`;
};
export const gatewayImagePathImagePathFromIpfs = (ipfsHash: string) => {
  return `https://daohaus.mypinata.cloud/ipfs/${ipfsHash}`;
};
