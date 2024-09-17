"use client";

import { LeaderItem } from "./leader-item";
import { usePodToken } from "@/hooks/usePodToken";

export function LeaderList({ tokenId }: { tokenId: string }) {
  const { podToken } = usePodToken({ tokenId });

  if (!podToken || !podToken.balances) return null;

  return (
    <>
      <h2 className="font-sans headline-sm text-xl text-center mt-10">
        Top Collectors
      </h2>

      <div className="p-4 flex flex-row flex-wrap items-center justify-between">
        <p className="text-xs">Collecter</p>
        <p className="text-xs">Collected</p>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {podToken.balances.map((balance) => {
          return <LeaderItem balance={balance} key={balance.id} />;
        })}
      </div>
    </>
  );
}
