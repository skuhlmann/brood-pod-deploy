"use client";

import { EnsInput } from "@/components/ens-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction } from "react";
import { AddressInput } from "./address-input";
import { ConnectKitButton } from "connectkit";

export default function ClaimInput({
  targetAddress,
  setTargetAddress,
  claimType,
  setClaimType,
}: {
  targetAddress?: string;
  setTargetAddress: Dispatch<SetStateAction<string | undefined>>;
  claimType?: string;
  setClaimType: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (value: string) => {
    setClaimType(value);
    setTargetAddress(undefined);
  };

  return (
    <>
      <p className="text-xs text-broodRed">Collect to</p>
      <RadioGroup
        defaultValue={claimType}
        onValueChange={handleChange}
        className="flex flex-row justify-center mt-3 mb-1 w-full"
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
        {claimType === "wallet" && <ConnectKitButton />}
      </div>
    </>
  );
}
