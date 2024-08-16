"use client";

import { useEnsAvatar } from "wagmi";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { Avatar, AvatarImage } from "./ui/avatar";

export function EnsAvatar({ ens }: { ens: string }) {
  const { data } = useEnsAvatar({
    chainId: mainnet.id,
    name: normalize(ens),
  });

  return (
    <Avatar className="w-8 h-8 mr-3">
      {data && <AvatarImage src={data} alt={ens} />}
      {!data && <AvatarImage src="/logo_footer.svg" alt="@brood" />}
    </Avatar>
  );
}
