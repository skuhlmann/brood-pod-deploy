"use client";

import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import Link from "next/link";

import { MEDIA_FILES } from "@/lib/constants";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";

export default function Footer() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center flex-wrap gap-5 w-full p-10 mt-10">
      <a target="_blank" href="https://raidguild.org/">
        <p className="text-sm">Made with ⚔️</p>
      </a>
      <div className="flex flex-row justify-center item-center gap-3 text-md">
        <ConnectKitButton />
        {address && (
          <Link href={`/pods/${address}`}>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-none hover:bg-transparent"
            >
              <Image
                src="/BROOD-steins-logo.png"
                alt="brood"
                width="50"
                height="50"
              />
            </Button>
          </Link>
        )}
        <a target="_blank" href="https://discord.gg/XKGM8u8XTQ" type="external">
          <Image
            src={MEDIA_FILES.icons.discord}
            alt="discord"
            width="32"
            height="32"
          />
        </a>
        <a
          target="_blank"
          href="https://warpcast.com/RaidBrood"
          type="external"
        >
          <Image
            src="/farcaster-white.png"
            alt="farcaster"
            width="32"
            height="32"
          />
        </a>
        <a target="_blank" href="https://twitter.com/RaidBrood" type="external">
          <Image
            src={MEDIA_FILES.icons.twitter}
            alt="twitter"
            width="32"
            height="32"
          />
        </a>
      </div>
    </div>
  );
}
