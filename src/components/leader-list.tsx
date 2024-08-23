"use client";

import { LeaderItem } from "./leader-item";
import { usePodToken } from "@/hooks/usePodToken";

export function LeaderList({ tokenId }: { tokenId: string }) {
  const { podToken } = usePodToken({ tokenId });

  if (!podToken || !podToken.balances) return null;

  return (
    <>
      <h2 className="text-center text-3xl font-bold mt-5">Leaders</h2>

      <div className="p-4 flex flex-col gap-5">
        {podToken.balances.map((balance) => {
          return <LeaderItem balance={balance} key={balance.id} />;
        })}
      </div>
    </>
  );
}
