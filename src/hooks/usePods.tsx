"use client";

import { useQuery } from "@tanstack/react-query";
import { NFT_CONTRACT_ADDRESS, TARGET_NETWORK } from "@/lib/constants";
import { ACTIVE_PODS } from "@/lib/pod-data";

const fetchPods = async () => {
  // TODO: replace with alchemy fetch when needed and make async
  const contractAddress = NFT_CONTRACT_ADDRESS[TARGET_NETWORK];
  console.log("fetching contract data", contractAddress);

  return { pods: ACTIVE_PODS };
};

const fetchPod = async ({ tokenId }: { tokenId: number }) => {
  // TODO: replace with alchemy fetch when needed
  const contractAddress = NFT_CONTRACT_ADDRESS[TARGET_NETWORK];
  console.log("fetching contract data", contractAddress);

  const targetPod = ACTIVE_PODS.find((pod) => tokenId === Number(pod.tokenId));
  return { pod: targetPod };
};

export const usePods = () => {
  const { data, error, ...rest } = useQuery({
    queryKey: ["active-pods"],
    queryFn: () => fetchPods(),
  });

  return { pods: data?.pods, ...rest };
};

export const usePod = (tokenId: number) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`pods-${tokenId}`],
    queryFn: () =>
      fetchPod({
        tokenId,
      }),
  });

  return { pod: data?.pod, ...rest };
};
