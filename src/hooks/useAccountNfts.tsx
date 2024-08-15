"use client";

import { SequenceIndexer } from "@0xsequence/indexer";
import { useQuery } from "@tanstack/react-query";
import { SEQUENCE_ENDPOINT, TARGET_NETWORK } from "@/lib/constants";
const { SEQUENCE_API_KEY } = process.env;

const fetchNftsForAccount = async ({
  accountAddress,
  contractAddress,
}: {
  accountAddress: string;
  contractAddress?: string;
}) => {
  if (!accountAddress || !contractAddress) {
    throw new Error("Missing Args");
  }

  const sequenceEndPoint = SEQUENCE_ENDPOINT[TARGET_NETWORK];

  if (!sequenceEndPoint) {
    throw new Error("Invalid ChainId");
  }

  const indexer = new SequenceIndexer(sequenceEndPoint, SEQUENCE_API_KEY);

  const nftBalances = await indexer.getTokenBalances({
    contractAddress: contractAddress,
    accountAddress: accountAddress,
    includeMetadata: true,
  });

  return { balances: nftBalances, page: nftBalances.page };
};

export const useAccountNfts = ({
  accountAddress,
  contractAddress,
}: {
  accountAddress: string;
  contractAddress: string;
}) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`accountNfts-${contractAddress}-${accountAddress}`],
    queryFn: () =>
      fetchNftsForAccount({
        accountAddress,
        contractAddress,
      }),
    enabled: !!contractAddress,
  });

  return { accountNfts: data?.balances, page: data?.page, error, ...rest };
};
