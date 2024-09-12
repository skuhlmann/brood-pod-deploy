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

      <div className="p-4 flex flex-col gap-12">
        {podTokens &&
          podTokens.map((pod: PodToken) => {
            return (
              <div
                key={pod.tokenId}
                className="border border-solid border-broodGreen shadow-brood hover:bg-broodGreen"
              >
                <Link href={`/leaderboard/${pod.tokenId}`}>
                  <div className="filter-none">
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
