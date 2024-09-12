"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import ClaimInput from "./claim-input";
import { toast } from "./ui/use-toast";
import { CHAIN_ID, POD_CONTRACT_ADDRESS } from "@/config/constants";
import { Beer } from "lucide-react";

// todo: validate code

export default function ClaimPod({
  tokenId,
  claimCode,
}: {
  tokenId: string;
  claimCode: string;
}) {
  const router = useRouter();
  const { address } = useAccount();

  const [targetAddress, setTargetAddress] = useState<string | undefined>();
  const [claimType, setClaimType] = useState<string>("ens");

  const [loading, setLoading] = useState<boolean>(false);

  const handleClaim = async () => {
    setLoading(true);
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
        // To DO: wait for transaction to be confirmed
        toast({
          title: "Claimed",
          description: "You have successfully claimed your Proof of Drink",
        });
        router.push(`/pods/${to}`);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const canClaim = targetAddress;

  if (!claimCode)
    return (
      <h2 className="text-center text-3xl font-bold my-5">Invalid Claim</h2>
    );

  return (
    <>
      <div className="flex flex-col items-center w-full mt-5">
        {loading && (
          <>
            <p>Glug glug glug....</p>
            <Beer className="mr-2 h-4 w-4 animate-spin" />
          </>
        )}
        {!loading && (
          <>
            <ClaimInput
              targetAddress={targetAddress}
              setTargetAddress={setTargetAddress}
              claimType={claimType}
              setClaimType={setClaimType}
            />

            <Button
              variant="brood"
              className="mt-5"
              disabled={!canClaim || loading}
              onClick={handleClaim}
            >
              {loading && <Beer className="mr-2 h-4 w-4 animate-spin" />}
              {!loading && <p className="font-sans">Collect</p>}
            </Button>
          </>
        )}
      </div>
    </>
  );
}
