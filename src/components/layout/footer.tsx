"use client";

import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { MEDIA_FILES } from "@/config/constants";

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
            <Button size="sm" variant="ghost" className="rounded-none">
              Your PODs
            </Button>
          </Link>
        )}
        <a target="_blank" href="https://brood.raidguild.org/" type="external">
          <Image
            src="/STEINS_LOGO_WHITE.svg"
            alt="brood"
            width="48"
            height="48"
          />
        </a>
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
          href="https://warpcast.com/~/channel/post-yer-ale"
          type="external"
        >
          <Image
            src="/farcaster-white.png"
            alt="farcaster"
            width="32"
            height="32"
          />
        </a>
      </div>
    </div>
  );
}
