"use client";

import Link from "next/link";
import { AddressAvatarDisplay } from "./address-avatar-display";
import { TokenBalance } from "@/lib/types";

export function LeaderItem({ balance }: { balance: TokenBalance }) {
  return (
    <div className="border border-solid border-broodGreen shadow-brood hover:bg-broodGreen mb-5">
      <Link href={`/pods/${balance.account.address}`}>
        <div className="p-4 flex flex-row flex-wrap gap-5 items-center justify-between">
          <div className="flex flex-row">
            <AddressAvatarDisplay address={balance.account.address} />
          </div>
          <p className="font-sans text-base text-broodRed">{balance.value}</p>
        </div>
      </Link>
    </div>
  );
}
