"use client";

import Image from "next/image";

import { usePodToken } from "@/hooks/usePodToken";
import Link from "next/link";

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
    <div className="border border-solid border-broodGreen shadow-brood hover:bg-broodGreen mb-10">
      <Link href={`/leaderboard/${tokenId}`}>
        <div className="flex flex-row items-center ">
          <p className="text-center text-7xl w-1/5 font-sans text-broodRed">
            {value}
          </p>
          <div className="p-4 flex flex-row flex-wrap gap-5 items-center justify-center w-3/5">
            <div>
              <Image
                src={meta.image}
                alt="logo"
                width="100"
                height="100"
                className="rounded-full"
              />
            </div>
            <div className="w-full sm:w-3/5">
              <p className="font-serif text-base font-bold">{`ID ${podToken?.id}`}</p>
              <p className="text-3xl font-sans text-broodRed">{meta.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
