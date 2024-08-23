"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { GRAPH_ENDPOINT, TARGET_NETWORK } from "@/lib/constants";
import { GET_POD_TOKENS } from "@/lib/graph-queries";

import { PodToken } from "@/lib/types";

export const usePodTokens = () => {
  const graphQLClient = new GraphQLClient(GRAPH_ENDPOINT[TARGET_NETWORK]);

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
