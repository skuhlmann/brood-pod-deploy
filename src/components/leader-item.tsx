"use client";

import { truncateAddress } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AddressAvatarDisplay } from "./address-avatar-display";

type LeaderItem = {
  ownerAddress: string;
  tokenBalances: {
    balance: string;
  }[];
};

export function LeaderItem({ row }: { row: LeaderItem }) {
  // const { data, error, isFetching } = useEnsAddress({
  //   chainId: mainnet.id,
  //   name: normalize(ens),
  // });

  return (
    <div className="p-4 flex flex-row flex-wrap gap-5 items-left justify-between">
      <div className="flex flex-row">
        <AddressAvatarDisplay address={row.ownerAddress} />
      </div>
      <p>{row.tokenBalances[0].balance}</p>
    </div>
  );
}
