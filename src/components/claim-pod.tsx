"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import ClaimInput from "./claim-input";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";

// todo: validate code

export default function ClaimPod({ tokenId }: { tokenId: string }) {
  const searchParams = useSearchParams();
  const claimCode = searchParams.get("code");
  const { address } = useAccount();

  const [targetAddress, setTargetAddress] = useState<string | undefined>();

  const [loading, setLoading] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  const handleClaim = async () => {
    setLoading(true);
    console.log(
      `claiming tokenid ${tokenId} to ${address} with code ${claimCode}`
    );

    setTimeout(() => {
      console.log("after delay");
      setLoading(false);
      setIsClaimed(true);
    }, 3000);
  };

  const canClaim = targetAddress;

  if (!claimCode)
    return (
      <h2 className="text-center text-3xl font-bold my-5">Invalid Claim</h2>
    );

  return (
    <>
      <h2 className="text-center text-3xl font-bold my-5">
        Claim Proof of Drink
      </h2>

      <div className="flex flex-col items-center w-full mt-5">
        {loading && <p>Glug glug glug....</p>}
        {!loading && !isClaimed && (
          <>
            <ClaimInput
              targetAddress={targetAddress}
              setTargetAddress={setTargetAddress}
            />

            <Button
              size="lg"
              className="mt-10"
              variant="secondary"
              disabled={!canClaim}
              onClick={handleClaim}
            >
              Claim
            </Button>
          </>
        )}
        {isClaimed && (
          <>
            <p>Down the hatch!</p>
            <Link href={`/pods/${targetAddress}`}>
              <Button>Checkout your POD count</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
