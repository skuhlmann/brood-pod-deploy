import { and, eq } from "drizzle-orm";
import { pods, claimCodes, merkleTrees } from "./schema";
import { db } from "./setup";
import { Address } from "viem";

export async function getMerkleTreeByPod(
  contractAddress: Address,
  tokenId: number,
  chainId: number
) {
  const pod = (await db.select().from(pods).where(
    and(
      eq(pods.contract_address, contractAddress),
      eq(pods.token_id, tokenId),
      eq(pods.chain_id, chainId)
    )
  ))[0]
  if (!pod) return undefined
  const tree = await db.select().from(merkleTrees).where(eq(merkleTrees.pod_id, pod.id))
  if (tree.length === 0) return undefined
  return tree[0]
}

export async function getClaimCodesByMerkleTree(treeId: number) {
  const results = await db.select().from(claimCodes).where(eq(claimCodes.tree_id, treeId))
  return results.sort((a, b) => Number(a.index - b.index))
}