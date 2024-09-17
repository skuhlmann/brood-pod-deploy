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
  const { data, error, isFetching } = useEnsAddress({
    chainId: mainnet.id,
    name: normalize(ens),
  });

  useEffect(() => {
    if (data) {
      setTargetAddress(data);
    } else {
      setTargetAddress(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!isFetching) {
    return null;
  }

  return <p>loading...</p>;
}

export function EnsInput({
  targetAddress,
  setTargetAddress,
}: {
  targetAddress: string | undefined;
  setTargetAddress: Dispatch<SetStateAction<string | undefined>>;
}) {
  const [ens, setEns] = useState<string | undefined>();

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
    <div className="w-full sm:w-4/5 px-3 sm:px-10">
      <Input
        type="text"
        placeholder="ENS"
        onChange={handleChange}
        defaultValue={ens}
      />
      {ens && (
        <EnsToAddressDisplay ens={ens} setTargetAddress={setTargetAddress} />
      )}
    </div>
  );
}
