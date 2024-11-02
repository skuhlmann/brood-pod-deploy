"use client";

import { usePodToken } from "@/hooks/usePodToken";
import { ExternalLink } from "lucide-react";

export function PodBenefits({ tokenId }: { tokenId: string }) {
  const { podToken, meta, benefits } = usePodToken({ tokenId });

  if (!podToken || !meta || !benefits) return null;

  return (
    <div className="p-3 border border-broodRed">
      <p className="text-lg font-bold mb-1 text-broodRed">
        POD Collector Benefits
      </p>
      <div className="flex flex-col gap-5 w-full mt-3">
        {benefits.map((benefit) => {
          return (
            <div key={benefit.label} className="flex flex-col gap-1">
              <p className="text-lg text-broodGreen font-bold">
                {benefit.label}
              </p>
              <p className="text-sm">{benefit.description}</p>
              <div>
                <a
                  href={benefit.external_url}
                  target="_blank"
                  className=" text-xs font-bold text-broodRed"
                >
                  <div className="flex flex-row items-center gap-1">
                    {benefit.link_title} <ExternalLink size={12} />
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
