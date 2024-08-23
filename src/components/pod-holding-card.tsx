"use client";

import Image from "next/image";
import { SiFarcaster } from "react-icons/si";
import { RiExternalLinkLine } from "react-icons/ri";

import { usePodToken } from "@/hooks/usePodToken";

export function PodHoldingCard({
  tokenId,
  value,
  castLink = false,
}: {
  tokenId: string;
  value: string;
  castLink?: boolean;
}) {
  const { podToken, meta } = usePodToken({ tokenId });

  if (!podToken || !meta) return null;

  return (
    <div className="p-4 flex flex-row flex-wrap gap-5 items-center justify-center">
      <p className="text-center text-9xl font-bold">{value}</p>
      <div>
        <Image
          src={meta.image}
          alt="logo"
          width="100"
          height="100"
          className="rounded-full"
        />
      </div>
      <div className="w-full sm:w-32">
        <p className="text-center text-4xl">{meta.name}</p>
      </div>
      <div>
        <a
          target="_blank"
          href={meta.external_url}
          className="underline text-sm text-broodRed"
        >
          <div className="flex items-center gap-1">
            <RiExternalLinkLine /> {`More ${meta.name} Info`}
          </div>
        </a>
        {castLink && (
          <a
            target="_blank"
            href="https:warpcast.com/earth2travis/0xec32e083"
            className="underline text-sm text-broodRed"
          >
            <div className="flex items-center gap-1">
              <SiFarcaster /> {`Cast`}
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
