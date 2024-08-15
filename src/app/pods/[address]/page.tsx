"use client";

import { useAccountNfts } from "@/hooks/useAccountNfts";
import { NFT_CONTRACT_ADDRESS, TARGET_NETWORK } from "@/lib/constants";
import Image from "next/image";

export default function Holdings({ params }: { params: { address: string } }) {
  const { accountNfts } = useAccountNfts({
    accountAddress: params.address,
    contractAddress: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
  });

  console.log("accountNfts", accountNfts);
  return (
    <main>
      <div className="mb-4 text-xs">address: {params.address}</div>
      {accountNfts?.balances && (
        <h3>{accountNfts.balances.length} PODs Held</h3>
      )}
      {accountNfts?.balances &&
        accountNfts.balances.map((nft) => {
          return (
            <div key={nft.tokenID}>
              <p>#{nft.tokenID}</p>
              {nft.tokenMetadata?.image && (
                <Image
                  src={nft.tokenMetadata?.image}
                  alt="logo"
                  width="100"
                  height="100"
                />
              )}
            </div>
          );
        })}
    </main>
  );
}
