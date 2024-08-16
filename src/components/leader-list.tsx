import Image from "next/image";
import { ACTIVE_PODS } from "@/lib/pod-data";

export async function LeaderList({ tokenId }: { tokenId: string }) {
  // const { pod } = usePod(tokenId);
  const pod = ACTIVE_PODS.find((pod) => tokenId === pod.tokenId);

  if (!pod) return null;

  return (
    <>
      <h2 className="text-center text-3xl font-bold mt-5">Leaders</h2>

      <div className="p-4 flex flex-row flex-wrap gap-5 items-center justify-center"></div>
    </>
  );
}
