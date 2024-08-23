"use client";

import { usePodTokensForAccount } from "@/hooks/usePodTokensForAccount";
import { PodHoldingCard } from "./pod-holding-card";

export function PodHoldingList({ address }: { address: string }) {
  const { account } = usePodTokensForAccount({
    address,
  });

  if (!account) return null;

  return (
    <>
      <h2 className="text-center text-xl">
        Holds {account.balances.length} Proof of Drink NFTs
      </h2>
      <div className="p-4 flex flex-col gap-5">
        {account.balances.map((balance) => {
          return (
            <div key={balance.id}>
              {balance.token && (
                <PodHoldingCard
                  tokenId={balance.token.id}
                  value={balance.value}
                  castLink
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
