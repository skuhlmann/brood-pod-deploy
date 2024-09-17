"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import ClaimInput from "./claim-input";
import { toast } from "./ui/use-toast";
import { CHAIN_ID, POD_CONTRACT_ADDRESS } from "@/config/constants";
import { Beer } from "lucide-react";
import { truncateAddress } from "@/lib/utils";
import { PodBenefits } from "./pod-benefits";
import { PodRelatedLinks } from "./pod-related-links";
import Link from "next/link";

import { useClaimStatus } from "@/hooks/useClaimStatus";
import { useQueryClient } from "@tanstack/react-query";

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
          description: "You have successfully colllected your Proof of Drink",
        });
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

        {success ||
          (alreadyClaimed && (
            <>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-broodGreen text-2xl font-bold">CHEERS!</p>
                <Beer className="h-7 w-7 text-broodRed" />
              </div>
              <p className="text-broodGreen text-base">
                POD has been collected{" "}
                {toAddress && ` by ${truncateAddress(toAddress)}`}
              </p>
              <div className="mt-10 mb-3 shadow-broodGreen w-full">
                <PodBenefits tokenId={tokenId} />
              </div>
              <div className="mt-10 mb-3 shadow-broodGreen w-full">
                <PodRelatedLinks tokenId={tokenId} />
              </div>
              <Link
                href={`/leaderboard/${tokenId}`}
                className="text-sm font-bold text-broodRed mt-5"
              >
                More about this drink
              </Link>
            </>
          ))}
      </div>
    </>
  );
}
