import { AddressAvatarDisplay } from "@/components/address-avatar-display";
import { PodHoldingList } from "@/components/pod-holding-list";

export default function Holdings({ params }: { params: { address: string } }) {
  return (
    <>
      <div className="flex flex-col flex-wrap justify-center items-center gap-3 sm:gap-1 w-full mt-0 sm:mt-5 px-4 sm:px-0">
        <h2 className="font-sans headline-sm text-4xl text-center mt-10">
          Collected
        </h2>
        <AddressAvatarDisplay address={params.address} />
        <PodHoldingList address={params.address} />
      </div>
    </>
  );
}
