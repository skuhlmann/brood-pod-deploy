import { claimCodes, merkleTrees, pods } from "@/db/schema";
import { db } from "../src/db/setup";
import { isAddress } from "viem";
import { and, eq } from "drizzle-orm";

interface UploadParams {
  tokenId: number;
  contractAddress: string;
  chainId: number;
}

async function getCodes({
  tokenId,
  contractAddress,
  chainId,
}: UploadParams) {
  const pod = await db.select().from(pods).where(
    and(
      eq(pods.token_id, tokenId),
      eq(pods.contract_address, contractAddress),
      eq(pods.chain_id, chainId),
    )
  )

  const tree = await db.select().from(merkleTrees).where(
    eq(merkleTrees.pod_id, pod[0].id),
  )

  const codes = await db.select().from(claimCodes).where(
    and(
      eq(claimCodes.tree_id, tree[0].id),
      eq(claimCodes.pod_id, pod[0].id),
    )
  )

  console.log("Codes:", codes.map((code) => ({
    index: code.index.toString(),
    code: code.code,
  })))
}

async function main() {
  let tokenId: number|string|null = prompt("Enter the token ID:")
  if (!tokenId) {
    throw new Error("No token ID provided")
  }
  tokenId = parseInt(tokenId)
  const contractAddress = prompt("Enter the contract address:")
  if (!contractAddress) {
    throw new Error("No contract address provided")
  }
  if (!isAddress(contractAddress)) {
    throw new Error("Invalid contract address")
  }
  let chainId: number|string|null = prompt("Enter the chain ID:")
  if (!chainId) {
    throw new Error("No chain ID provided")
  }
  chainId = parseInt(chainId)
  await getCodes({ tokenId, contractAddress, chainId })
  console.log("✅ Done.")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })