"use client";

import { EnsInput } from "@/components/ens-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Button } from "./ui/button";
import { AddressInput } from "./address-input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Address } from "viem";
import { CHAIN_ID, POD_CONTRACT_ADDRESS } from "@/config/constants";
import { toast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

export default function ClaimInput({ tokenId }: { tokenId: string }) {
  const searchParams = useSearchParams();
  const claimCode = searchParams.get("code");
  const { address } = useAccount();

  const [claimType, setClaimType] = useState<string>("ens");
  const [targetAddress, setTargetAddress] = useState<string | undefined>();
  const [claiming, setClaiming] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (value: string) => {
    setClaimType(value);
    setTargetAddress(undefined);
  };

  const validInput = targetAddress;

  async function handleClaim(to: Address) {
    setClaiming(true);
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
          description: "You have successfully claimed your proof of drink",
        });
        router.push(`/pods/${targetAddress}`);
      }
    } catch (error) {
      console.error(error);
    }
    setClaiming(false);
  }

  if (!claimCode)
    return (
      <h2 className="text-center text-3xl font-bold my-5">Invalid Claim</h2>
    );

  return (
    <>
      <h2 className="text-center text-3xl font-bold my-5">
        Claim Proof of Drink
      </h2>

      <RadioGroup
        defaultValue={claimType}
        onValueChange={handleChange}
        className="flex flex-row justify-center my-5 w-full"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ens" id="r1" />
          <Label htmlFor="r1">ENS</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="address" id="r2" />
          <Label htmlFor="r2">Address</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="wallet" id="r3" />
          <Label htmlFor="r3">Connected Wallet</Label>
        </div>
      </RadioGroup>
      <div className="flex flex-col items-center w-full mt-5">
        {claimType === "ens" && (
          <EnsInput
            targetAddress={targetAddress}
            setTargetAddress={setTargetAddress}
          />
        )}
        {claimType === "address" && (
          <AddressInput
            targetAddress={targetAddress}
            setTargetAddress={setTargetAddress}
          />
        )}
        {claimType === "wallet" && (
          <>
            {address && <p className="text-xs">Connected with {address}</p>}
            {!address && <ConnectKitButton />}
          </>
        )}

        <Button
          size="lg"
          className="mt-10"
          variant="secondary"
          disabled={!validInput || claiming}
          onClick={() => handleClaim(targetAddress as Address)}
        >
          {claiming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Claim
        </Button>
      </div>
    </>
  );
}
