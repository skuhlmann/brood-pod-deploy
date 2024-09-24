import { claimCodes, merkleTrees, pods } from "@/db/schema";
import { db } from "../src/db/setup";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { isAddress } from "viem";

interface UploadParams {
  tokenId: number;
  contractAddress: string;
  chainId: number;
}

// Uploads a Merkle Tree JSON file to the database
async function upload({
  tokenId,
  contractAddress,
  chainId,
}: UploadParams) {
  // Read the Merkle Tree JSON file
  const treeData = JSON.parse(
    fs.readFileSync(`scripts/codes/merkle-tree-${tokenId}.json`, "utf8")
  );

  // Convert the Merkle Tree to a StandardMerkleTree
  const standardMerkleTree = StandardMerkleTree.load(treeData);

  // Upload the Merkle Tree to the database
  const pod = await db.insert(pods).values({
    token_id: tokenId,
    contract_address: contractAddress,
    chain_id: chainId,
  }).returning()

  const tree = await db.insert(merkleTrees).values({
    pod_id: pod[0].id,
    root: standardMerkleTree.root,
    format: treeData.format,
    leaf_encoding: treeData.leafEncoding.toString(),
  }).returning()

  await db.insert(claimCodes).values(
    treeData.values.map((item: any, index: number) => {
      return {
        pod_id: pod[0].id,
        tree_id: tree[0].id,
        index: BigInt(index), // item.treeIndex
        code: item.value[0],
        // leaf: item[1],
      }
    })
  )

  console.log(`Merkle Tree uploaded for token ${tokenId} on chain ${chainId}`)
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
  await upload({ tokenId, contractAddress, chainId })
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