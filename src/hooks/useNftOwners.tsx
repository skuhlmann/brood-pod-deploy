"use client";

import {
  ALCHEMY_ENDPOINT,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const fetchNftOwners = async ({ tokenId }: { tokenId: string }) => {
  if (!tokenId) {
    throw new Error("Missing Args");
  }

  const contractAddress = NFT_CONTRACT_ADDRESS[TARGET_NETWORK];
  const baseUrl = ALCHEMY_ENDPOINT[TARGET_NETWORK];

  const options = { method: "GET", headers: { accept: "application/json" } };

  fetch(
    `${baseUrl}${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getOwnersForContract?contractAddress=${contractAddress}&withTokenBalances=true`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return { data: response };
    })
    .catch((err) => {
      console.error(err);
      // return { error: err };
      throw err;
    });

  // return { balances: nftBalances, page: nftBalances.page };
};

export const useNftOwners = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`accountNfts-${tokenId}`],
    queryFn: () =>
      fetchNftOwners({
        tokenId,
      }),
    enabled: !!tokenId,
  });

  return { data: data, error, ...rest };
};
