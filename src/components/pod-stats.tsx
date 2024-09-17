"use client";

import { ExternalLink } from "lucide-react";
import { usePodToken } from "@/hooks/usePodToken";
import { getAttributeValue } from "@/lib/beer-meta-utils";
import { gatewayImagePath } from "@/lib/utils";

export function PodStats({ tokenId }: { tokenId: string }) {
  const { podToken, meta } = usePodToken({ tokenId });

  if (!podToken || !meta) return null;

  return (
    <div className="p-3 border border-broodGreen">
      <p className="text-lg font-bold mb-1 text-broodGreen">Beer Stats</p>
      <div className="flex flex-row flex-wrap gap-4 w-full justify-between">
        <div>
          <p className="text-xs font-bold">Style</p>
          <p className="text-base mb-1">{getAttributeValue("Style", meta)}</p>
        </div>
        <div>
          <p className="text-xs font-bold">ABV/IBU</p>
          <p className="text-base mb-1">{`${getAttributeValue(
            "ABV",
            meta
          )}/${getAttributeValue("IBU", meta)}`}</p>
        </div>
        <div>
          <p className="text-xs font-bold">Hops</p>
          <p className="text-base mb-1">{getAttributeValue("Hops", meta)}</p>
        </div>
        <div>
          <p className="text-xs font-bold">Adjuncts</p>
          <p className="text-base mb-1">
            {getAttributeValue("Adjuncts", meta)}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold">Yeast</p>
          <p className="text-base mb-1">{getAttributeValue("Yeast", meta)}</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-5 mb-1">
        {meta.brewery_url && (
          <a
            href={gatewayImagePath(meta.brewery_url)}
            target="_blank"
            className=" text-sm font-bold text-broodRed"
          >
            <div className="flex flex-row items-center gap-1">
              {meta.brewery_name} <ExternalLink size={16} />
            </div>
          </a>
        )}
        {meta.recipe_url && (
          <a
            href={gatewayImagePath(meta.recipe_url)}
            target="_blank"
            className=" text-sm font-bold text-broodRed"
          >
            <div className="flex flex-row items-center gap-1">
              Onchain Recipe <ExternalLink size={16} />
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
