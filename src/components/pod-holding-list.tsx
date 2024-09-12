"use client";

import { usePodTokensForAccount } from "@/hooks/usePodTokensForAccount";
import { PodHoldingCard } from "./pod-holding-card";

export function PodHoldingList({ address }: { address: string }) {
  const { account, total } = usePodTokensForAccount({
    address,
  });

  if (!account) return null;

  return (
    <div className="sm:w-144">
      <h2 className="text-center text-xl mb-10">
        Holds {total} Proof of Drink NFTs
      </h2>
      {account.balances.map((balance) => {
        return (
          <div key={balance.id}>
            {balance.token && (
              <PodHoldingCard
                tokenId={balance.token.id}
                value={balance.value}
                castLink={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
