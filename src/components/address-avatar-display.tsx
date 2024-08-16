"use client";

import { useEnsName } from "wagmi";
import { mainnet } from "viem/chains";
import { Avatar, AvatarImage } from "./ui/avatar";
import { truncateAddress } from "@/lib/utils";
import { EnsAvatar } from "./ens-avatar";

export function AddressAvatarDisplay({ address }: { address: string }) {
  const { data } = useEnsName({
    chainId: mainnet.id,
    address: address as `0x${string}`,
  });

  return (
    <>
      {data && (
        <div className="flex flex-row gap-1">
          <EnsAvatar ens={data} />
          <p className="text-lg sm:text-3xl">{data}</p>
        </div>
      )}
      {!data && (
        <div className="flex flex-row gap-1">
          <Avatar className="w-8 h-8 mr-3">
            <AvatarImage src="/logo_footer.svg" alt="@brood" />
          </Avatar>
          <p className="text-lg sm:text-3xl">{truncateAddress(address)}</p>
        </div>
      )}
    </>
  );
}
