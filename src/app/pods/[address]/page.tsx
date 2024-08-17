import { AddressAvatarDisplay } from "@/components/address-avatar-display";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { useAccountNfts } from "@/hooks/useAccountNfts";
import { NFT_CONTRACT_ADDRESS, TARGET_NETWORK } from "@/lib/constants";

const data = [
  {
    tokenId: "1",
    balance: "3",
  },
  {
    tokenId: "2",
    balance: "1",
  },
];
const totalPods = 4;

export default function Holdings({ params }: { params: { address: string } }) {
  // replace with real 1155 data

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center items-center gap-3 sm:gap-1 w-full mt-5">
        <AddressAvatarDisplay address={params.address} />
        <h2 className="text-center text-xl">
          Holds {totalPods} Proof of Drink NFTs
        </h2>

        {data.map((balance) => {
          return (
            <div
              key={balance.tokenId}
              className="flex flex-col sm:flex-row justify-center items-center gap-1 mt-3 w-2/3"
            >
              <p className="text-center text-9xl font-bold">
                {balance.balance}
              </p>
              <PodOverviewCard tokenId={balance.tokenId} size="lg" castLink />
            </div>
          );
        })}
      </div>
    </>
  );
}
