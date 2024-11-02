"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import ClaimInput from "./claim-input";
import { toast } from "./ui/use-toast";
import {
  CHAIN_ID,
  EXPLORER_ENDPOINT,
  POD_CONTRACT_ADDRESS,
} from "@/config/constants";
import { Beer } from "lucide-react";
import { truncateAddress } from "@/lib/utils";
import { PodBenefits } from "./pod-benefits";
import { PodRelatedLinks } from "./pod-related-links";
import Link from "next/link";
import { Vote } from "lucide-react";

import { useClaimStatus } from "@/hooks/useClaimStatus";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function ClaimPod({
  tokenId,
  claimCode,
}: {
  tokenId: string;
  claimCode: string;
}) {
  const queryClient = useQueryClient();

  const { address } = useAccount();

  const { claim, isFetching } = useClaimStatus({ tokenId, claimCode });

  const [targetAddress, setTargetAddress] = useState<string | undefined>();
  const [claimType, setClaimType] = useState<string>("ens");

  const [claiming, setClaiming] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [txHash, setTxHash] = useState<string | undefined>();

  const handleClaim = async () => {
    setClaiming(true);
    const to = claimType === "wallet" ? address : targetAddress;

    try {
      const res = await fetch(`/api/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claimCode,
          address: to,
          tokenId,
          contractAddress: POD_CONTRACT_ADDRESS,
          chainId: CHAIN_ID,
          sponsored: true,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        // TODO: wait for transaction to be confirmed

        await queryClient.invalidateQueries({
          queryKey: [`get-pod-${tokenId}`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`get-pods`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`get-account-${to}`],
        });

        toast({
          title: "Cheers!",
          description: "You have successfully collected your Proof of Drink",
        });
        setTxHash(data.txHash);
        setSuccess(true);
        setError(undefined);
      }
      if (data.error) {
        console.log("res error", data.error);
        setError(data.error);
        setTargetAddress(undefined);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to Collect POD");
      setTargetAddress(undefined);
    }

    setClaiming(false);
  };

  const alreadyClaimed = !isFetching && claim;
  const canClaim = targetAddress || (claimType === "wallet" && address != null);
  const toAddress = claimType === "wallet" ? address : targetAddress;
  const showSuccess = alreadyClaimed || success;

  if (isFetching) return null;

  return (
    <>
      <div className="flex flex-col items-center w-full  mt-0 sm:mt-5">
        {claiming && (
          <>
            <p className="text-sm text-broodGreen mb-2">Collecting...</p>
            <Beer className="mr-2 mb-3 h-24 w-24 text-broodRed animate-spin" />
            <p className="text-lg text-broodGreen font-bold">GLUG GLUG GLUG</p>
          </>
        )}

        {!claiming && !success && !alreadyClaimed && (
          <>
            <ClaimInput
              targetAddress={targetAddress}
              setTargetAddress={setTargetAddress}
              claimType={claimType}
              setClaimType={setClaimType}
            />

            <Button
              variant="brood"
              size="brood"
              className="mt-8"
              disabled={!canClaim || claiming}
              onClick={handleClaim}
            >
              <div className="flex flex-col">
                <p className="font-sans text-2xl">Collect</p>
                {canClaim && toAddress && (
                  <p className="text-xs text-broodRed">
                    to {truncateAddress(toAddress)}
                  </p>
                )}
              </div>
            </Button>
          </>
        )}

        {error && (
          <p className="text-broodRed text-base font-bold mt-3">{error}</p>
        )}

        {showSuccess && (
          <>
            <div className="w-full sm:w-3/4 p-5 border border-broodRed my-5 text-center flex flex-col items-center">
              <div className="flex flex-row gap-2 items-center justify-center">
                <p className="text-broodGreen text-5xl font-bold font-sans headline-sm">
                  CHEERS!
                </p>
                <Beer className="h-12 w-12 mb-3 text-broodRed -rotate-45" />
              </div>
              <p className="text-broodGreen text-base">
                POD collected {toAddress && ` by ${truncateAddress(toAddress)}`}
              </p>
              {txHash && (
                <div className="mt-0">
                  <a
                    className="text-xs text-broodRed"
                    href={`${EXPLORER_ENDPOINT}${txHash}`}
                    target="_blank"
                  >
                    View TX{" "}
                  </a>
                </div>
              )}
              <p className="text-broodRed font-bold text-xl mb-1 mt-5 text-center">
                You are now a part of the Brood community! You will have token
                gated access to post to the Warpcast channel /post-yer-ale. Take
                a pic of your beer and show it off.
              </p>

              <Button variant="brood" size="brood" className="mt-3 mb-5">
                <a
                  href="https://warpcast.com/~/compose?text=Cheers!&channelKey=post-yer-ale"
                  target="_blank"
                >
                  <div className="flex flex-row items-center justify-center gap-1">
                    <Image
                      src="/farcaster-white.png"
                      alt="farcaster"
                      width="40"
                      height="40"
                    />
                    <p className="text-xl">Post Yer Ale</p>
                  </div>
                </a>
              </Button>
            </div>

            <div className="mt-10 mb-3 shadow-broodGreen w-full">
              <PodRelatedLinks tokenId={tokenId} />
            </div>
            <div className="mt-10 mb-3 shadow-broodGreen w-full">
              <PodBenefits tokenId={tokenId} />
            </div>
            <Link
              href={`/leaderboard/${tokenId}`}
              className="text-sm font-bold text-broodRed mt-5"
            >
              More about this drink
            </Link>
          </>
        )}
      </div>
    </>
  );
}
