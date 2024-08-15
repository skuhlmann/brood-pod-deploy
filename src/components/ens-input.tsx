"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useEnsAddress } from "wagmi";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { Input } from "./ui/input";

const ENS_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.eth/;

export function EnsToAddressDisplay({
  ens,
  setTargetAddress,
}: {
  ens: string;
  setTargetAddress: Dispatch<SetStateAction<string | undefined>>;
}) {
  console.log("ens", ens);
  const { data, error, isFetching } = useEnsAddress({
    chainId: mainnet.id,
    name: normalize(ens),
  });

  console.log("isFetching", isFetching);
  console.log("data", data);
  console.log("error", error);

  useEffect(() => {
    if (data) {
      setTargetAddress(data);
    } else {
      setTargetAddress(undefined);
    }
  }, [data]);

  if (!isFetching) {
    return null;
  }

  return <p>loading...</p>;
}

export function EnsInput() {
  const [ens, setEns] = useState<string | undefined>();
  const [targetAddress, setTargetAddress] = useState<string | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const match = e.target.value.match(ENS_REGEX);
    if (match) {
      setEns(e.target.value);
    } else {
      setEns(undefined);
      setTargetAddress(undefined);
    }
  };

  return (
    <div className="w-56">
      <Input
        type="text"
        placeholder="ENS"
        onChange={handleChange}
        defaultValue={ens}
      />
      {ens && (
        <EnsToAddressDisplay ens={ens} setTargetAddress={setTargetAddress} />
      )}
      {targetAddress && (
        <p className="text-xs">target address: {targetAddress}</p>
      )}
    </div>
  );
}
