"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { GET_CLAIM_STATUS } from "@/lib/graph-queries";

import { ClaimRes } from "@/lib/types";
import { CHAIN_ID, GRAPH_ENDPOINT } from "@/config/constants";

export const useClaimStatus = ({
  tokenId,
  claimCode,
}: {
  tokenId: string;
  claimCode: string;
}) => {
  const graphQLClient = new GraphQLClient(GRAPH_ENDPOINT[CHAIN_ID]);

  const claimId = `${tokenId}-${claimCode}`;

  const { data, error, ...rest } = useQuery({
    queryKey: ["get-claim-code", { claimId }],
    queryFn: async () =>
      (await graphQLClient.request(GET_CLAIM_STATUS, { id: claimId })) as {
        claim: ClaimRes;
      },
  });

  return {
    claim: data?.claim,
    ...rest,
  };
};
