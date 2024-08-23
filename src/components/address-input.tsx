"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";

const ADDRESS_REGEX = /^(0x)?[0-9a-fA-F]{40}$/;

export function AddressInput({
  targetAddress,
  setTargetAddress,
}: {
  targetAddress: string | undefined;
  setTargetAddress: Dispatch<SetStateAction<string | undefined>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const match = e.target.value.match(ADDRESS_REGEX);
    if (match) {
      setTargetAddress(e.target.value);
    } else {
      setTargetAddress(undefined);
    }
  };

  return (
    <div className="w-full sm:w-4/5 px-3 sm:px-10">
      <Input
        type="text"
        placeholder="Wallet Address"
        onChange={handleChange}
        defaultValue={targetAddress}
      />
    </div>
  );
}
