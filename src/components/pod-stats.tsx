"use client";

import { usePodToken } from "@/hooks/usePodToken";

export function PodStats({ tokenId }: { tokenId: string }) {
  const { podToken, meta } = usePodToken({ tokenId });

  if (!podToken || !meta) return null;

  return (
    <div className="flex flex-row flex-wrap gap-10 w-full p-5 border border-broodGreen">
      <div>
        <p className="text-base font-bold mb-1">
          {`${podToken?.totalClaims} Collector${
            podToken?.totalClaims && Number(podToken.totalClaims) > 1 ? "s" : ""
          }`}
        </p>
      </div>
      <div>
        <p className="text-base font-bold mb-1">Brewed September 2024</p>
      </div>
      <div>
        <p className="text-base font-bold mb-1">Cascade Hops</p>
      </div>
      <div>
        <p className="text-base font-bold mb-1">9.5 ABV</p>
      </div>
      <div>
        <p className="text-base font-bold mb-1">5.5 IBU</p>
      </div>
    </div>
  );
}
