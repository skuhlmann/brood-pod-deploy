"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { GRAPH_ENDPOINT, TARGET_NETWORK } from "@/lib/constants";
import { GET_POD_TOKEN } from "@/lib/graph-queries";

import { PodToken, TokenMeta } from "@/lib/types";
import { gatewayImagePath, gatewayImagePathTemp } from "@/lib/utils";
import { get } from "@/lib/fetch";

export const usePodToken = ({ tokenId }: { tokenId: string }) => {
  const graphQLClient = new GraphQLClient(GRAPH_ENDPOINT[TARGET_NETWORK]);

  const { data, ...rest } = useQuery({
    queryKey: ["get-pod", { tokenId }],
    queryFn: async () => {
      const res = (await graphQLClient.request(GET_POD_TOKEN, {
        tokenId,
      })) as {
        podtoken: PodToken;
      };

      let meta: TokenMeta | undefined;
      if (res?.podtoken) {
        const url = gatewayImagePath(res.podtoken.uri);
        if (url) {
          meta = await get(url);
        }
      }
      if (meta) {
        // TODO: token 1 has bad image uri - change this with next contract
        const urlFn = tokenId === "1" ? gatewayImagePathTemp : gatewayImagePath;
        meta = {
          ...meta,
          image: urlFn(meta.image) || "",
        };
      }

      return { ...res, meta };
    },
  });

  return {
    podToken: data?.podtoken,
    meta: data?.meta,
    ...rest,
  };
};