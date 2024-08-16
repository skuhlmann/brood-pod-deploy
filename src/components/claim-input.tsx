"use client";

import { EnsInput } from "@/components/ens-input";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Button } from "./ui/button";
import { AddressInput } from "./address-input";
import Link from "next/link";

export default function ClaimInput({ tokenId }: { tokenId: string }) {
  const [claimType, setClaimType] = useState<string>("ens");
  const [targetAddress, setTargetAddress] = useState<string | undefined>();

  const handleChange = (value: string) => {
    setClaimType(value);
    setTargetAddress(undefined);
  };

  console.log("targetAddress", targetAddress);

  const validInput = targetAddress;

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
          <Button size="lg" className="mt-10">
            Connect Wallet
          </Button>
        )}

        <Link
          href={
            validInput ? "/pods/0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF" : ""
          }
        >
          <Button
            size="lg"
            className="mt-10"
            variant="secondary"
            disabled={!validInput}
          >
            Claim
          </Button>
        </Link>
      </div>
    </>
  );
}
