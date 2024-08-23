"use client";

import Image from "next/image";
import { SiFarcaster } from "react-icons/si";
import { RiExternalLinkLine } from "react-icons/ri";

import { usePodToken } from "@/hooks/usePodToken";

export function PodOverviewCard({
  tokenId,
  size,
  castLink = false,
}: {
  tokenId: string;
  size: "sm" | "lg";
  castLink?: boolean;
}) {
  const { podToken, meta } = usePodToken({ tokenId });

  if (!podToken || !meta) return null;

  if (size === "sm") {
    return (
      <div className="p-4 flex flex-row flex-wrap gap-5 items-center justify-center">
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
          <p className="text-4xl">{meta.name}</p>
        </div>
        <div className="w-full sm:w-2/4">
          <p className="text-m font-bold mb-1">
            Total Claims: {podToken?.totalClaims}
          </p>
          <p className="text-sm">{meta.description}</p>
        </div>
      </div>
    );
  }

  if (size === "lg") {
    return (
      <div className="p-4 flex flex-row flex-wrap items-center justify-center">
        <div className="w-full sm:w-2/4 flex justify-center">
          <Image
            src={meta.image}
            alt="logo"
            width="300"
            height="300"
            className="hidden sm:block rounded-full"
          />
          <Image
            src={meta.image}
            alt="logo"
            width="200"
            height="200"
            className="block sm:hidden rounded-full"
          />
        </div>
        <div className="w-full sm:w-2/4 p-2 sm:p-10 flex flex-col gap-5 justify-center">
          <div className="w-full">
            <p className="text-3xl sm:text-5xl font-bold">{meta.name}</p>
          </div>
          <div className="w-full">
            <p className="text-sm sm:text-md">{meta.description}</p>
          </div>
          <div className="w-full">
            <p className="text-m font-bold mb-1">
              Total Claims: {podToken?.totalClaims}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
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
                href="https://warpcast.com/earth2travis/0xec32e083"
                className="underline text-sm text-broodRed"
              >
                <div className="flex items-center gap-1">
                  <SiFarcaster /> {`Cast`}
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}
