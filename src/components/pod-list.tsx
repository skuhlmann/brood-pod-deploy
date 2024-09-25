"use client";

import Link from "next/link";
import { PodOverviewCard } from "./pod-overview-card";
import { usePodTokens } from "@/hooks/usePodTokens";
import { PodToken } from "@/lib/types";

export function PodList() {
  const { podTokens } = usePodTokens();

  if (!podTokens) return null;

  return (
    <>
      <h2 className="text-center mt-5 font-sans text-broodRed">BROOD.BEER</h2>

      <div className="p-4 flex flex-col gap-12 w-full sm:w-2/4">
        {podTokens &&
          podTokens.map((pod: PodToken) => {
            return (
              <div key={pod.tokenId}>
                <Link href={`/leaderboard/${pod.tokenId}`}>
                  <div className="filter-none border border-solid border-broodGreen shadow-brood hover:bg-broodGreen">
                    <PodOverviewCard tokenId={pod.tokenId} size="sm" />
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
