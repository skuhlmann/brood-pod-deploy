"use client";

import Link from "next/link";
import { PodOverviewCard } from "./pod-overview-card";
import { usePodTokens } from "@/hooks/usePodTokens";

export function PodList() {
  const { podTokens } = usePodTokens();

  if (!podTokens) return null;

  return (
    <>
      <h2 className="text-center text-3xl font-bold mt-5">POD Tokens</h2>

      <div className="p-4 flex flex-col gap-5">
        {podTokens &&
          podTokens.map((pod) => {
            return (
              <Link key={pod.tokenId} href={`/leaderboard/${pod.tokenId}`}>
                <div className="hover:bg-broodRed">
                  <PodOverviewCard tokenId={pod.tokenId} size="sm" />
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
