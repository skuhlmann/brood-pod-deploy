import { getMerkleTreeByPod, getClaimCodesByMerkleTree } from "@/db/queries";
import { type NextRequest, NextResponse } from "next/server";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { Chain, createPublicClient, Hex, http, parseAbi, walletActions } from "viem";
import { base, baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const chains: {[id: number]: Chain} = {
  [baseSepolia.id]: baseSepolia,
  [base.id]: base
}

function getChain(id: number) {
  return chains[id]
}

export async function POST(req: NextRequest) {
  const { claimCode, address, tokenId, contractAddress, chainId, sponsored } = await req.json()
  const tree = await getMerkleTreeByPod(contractAddress, Number(tokenId), Number(chainId))
  if (!tree) return NextResponse.json({ error: "Pod not found" }, { status: 404 })
  const codes = await getClaimCodesByMerkleTree(tree.id)
  if (codes.length === 0) return NextResponse.json({ error: "No claim codes found" }, { status: 404 })
  const code = codes.find(c => c.code === claimCode)
  if (!code) return NextResponse.json({ error: "Claim code not found" }, { status: 404 })
  // Create merkle tree from codes
  const merkleTree = StandardMerkleTree.of(codes.map(c => [c.code]), ["string"]);
  // Verify merkle root matches root in contract
  const client = createPublicClient({
    chain: getChain(chainId),
    transport: http()
  })
  const rootOnchain = await client.readContract({
    address: contractAddress,
    abi: parseAbi([
      'function merkleRootOf(uint256 id) external view returns (bytes32)'
    ]),
    functionName: 'merkleRootOf',
    args: [BigInt(tokenId)]
  })
  if (rootOnchain !== merkleTree.root) return NextResponse.json({ error: "Merkle root does not match" }, { status: 400 })
  // Generate merkle proof for claim code
  const index = codes.findIndex(c => c.code === claimCode)
  const proof = merkleTree.getProof(Number(index)) as Hex[]
  // If sponsored, mint NFT to address on user's behalf
  if (sponsored) {
    try {
      const tx = await client.extend(walletActions).writeContract({
        account: privateKeyToAccount(process.env.SPONSOR_PRIVATE_KEY as Hex),
        address: contractAddress,
        abi: parseAbi([
          'function claim(address account,uint256 id,string calldata claimCode,bytes32[] calldata proof) external'
        ]),
        functionName: 'claim',
        args: [address, tokenId, claimCode, proof]
      })
      return NextResponse.json({ success: true, txHash: tx }, { status: 200 })
    } catch (error: any) {
      console.error(error)
      return NextResponse.json({ success: false, error: "Error executing claim tx as sponsor", proof }, { status: 500 })
    }
  }
  // Else, return proof to client
  // if (code.leaf !== address) return NextResponse.json({ error: "Invalid claim code" }, { status: 400 })
  return NextResponse.json({ success: true, proof }, { status: 200 })
}