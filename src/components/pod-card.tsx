import Image from "next/image";
import { ACTIVE_PODS } from "@/lib/pod-data";

export async function PodCard({
  tokenId,
  size,
}: {
  tokenId: number;
  size: "sm" | "lg";
}) {
  // const { pod } = usePod(tokenId);
  const pod = ACTIVE_PODS.find((pod) => tokenId === pod.tokenId);

  if (!pod) return null;

  return (
    <div className="p-4 flex flex-row gap-5 items-center justify-center">
      <div>
        <Image src={pod.image} alt="logo" width="100" height="100" />
      </div>
      <div className="w-32">
        <p className="text-4xl">{pod.name}</p>
      </div>
      <div className="w-2/4">
        <p className="text-sm">{pod.description}</p>
      </div>
    </div>
  );
}
