"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { GET_POD_TOKENS } from "@/lib/graph-queries";

import { PodToken } from "@/lib/types";
import { CHAIN_ID, GRAPH_ENDPOINT } from "@/config/constants";

export const usePodTokens = () => {
  const graphQLClient = new GraphQLClient(GRAPH_ENDPOINT[CHAIN_ID]);

  const { data, error, ...rest } = useQuery({
    queryKey: ["get-pods"],
    queryFn: async () =>
      (await graphQLClient.request(GET_POD_TOKENS)) as {
        podtokens: PodToken[];
      },
  });

  return {
    podTokens: data?.podtokens,
    ...rest,
  };
};
