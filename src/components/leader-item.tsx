"use client";

import { AddressAvatarDisplay } from "./address-avatar-display";
import { TokenBalance } from "@/lib/types";

export function LeaderItem({ balance }: { balance: TokenBalance }) {
  return (
    <div className="p-4 flex flex-row flex-wrap gap-5 items-left justify-between">
      <div className="flex flex-row">
        <AddressAvatarDisplay address={balance.account.address} />
      </div>
      <p>{balance.value}</p>
    </div>
  );
}
