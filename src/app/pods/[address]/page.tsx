import { AddressAvatarDisplay } from "@/components/address-avatar-display";
import { PodHoldingList } from "@/components/pod-holding-list";

export default function Holdings({ params }: { params: { address: string } }) {
  return (
    <>
      <div className="flex flex-col flex-wrap justify-center items-center gap-3 sm:gap-1 w-full mt-5">
        <AddressAvatarDisplay address={params.address} />
        <PodHoldingList address={params.address} />
      </div>
    </>
  );
}
