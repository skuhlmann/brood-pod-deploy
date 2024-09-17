"use client";

import { usePodToken } from "@/hooks/usePodToken";
import { gatewayImagePath } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export function PodRelatedLinks({ tokenId }: { tokenId: string }) {
  const { podToken, meta } = usePodToken({ tokenId });

  if (!podToken || !meta) return null;

  return (
    <div className="p-3 border border-broodWhite">
      <p className="text-lg font-bold mb-1 text-broodWhite">Partners</p>
      <div className="flex flex-row flex-wrap gap-4 mb-1">
        {meta.partner_urls.map((partner) => {
          return (
            <a
              href={gatewayImagePath(partner.external_url)}
              target="_blank"
              className=" text-sm font-bold text-broodRed"
            >
              <div className="flex flex-row items-center gap-1">
                {partner.name} <ExternalLink size={16} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
