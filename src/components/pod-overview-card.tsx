import Image from "next/image";
import { ACTIVE_PODS } from "@/lib/pod-data";

export async function PodOverviewCard({
  tokenId,
  size,
}: {
  tokenId: string;
  size: "sm" | "lg";
}) {
  // const { pod } = usePod(tokenId);
  const pod = ACTIVE_PODS.find((pod) => tokenId === pod.tokenId);

  if (!pod) return null;

  console.log("size", size);

  if (size === "sm") {
    return (
      <div className="p-4 flex flex-row flex-wrap gap-5 items-center justify-center">
        <div>
          <Image src={pod.image} alt="logo" width="100" height="100" />
        </div>
        <div className="w-full sm:w-32">
          <p className="text-4xl">{pod.name}</p>
        </div>
        <div className="w-full sm:w-2/4">
          <p className="text-sm">{pod.description}</p>
        </div>
      </div>
    );
  }

  if (size === "lg") {
    return (
      <div className="p-4 flex flex-row flex-wrap items-center justify-center">
        <div className="w-full sm:w-2/4 flex justify-center">
          <Image
            src={pod.image}
            alt="logo"
            width="300"
            height="300"
            className="hidden sm:block"
          />
          <Image
            src={pod.image}
            alt="logo"
            width="200"
            height="200"
            className="block sm:hidden"
          />
        </div>
        <div className="w-full sm:w-2/4 p-2 sm:p-10 flex flex-col gap-5 justify-center">
          <div className="w-full">
            <p className="text-3xl sm:text-5xl font-bold">{pod.name}</p>
          </div>
          <div className="w-full">
            <p className="text-sm sm:text-md">{pod.description}</p>
          </div>
          <div className="w-full">
            <a
              target="_blank"
              href={pod.external_url}
              className="underline text-sm text-broodRed"
            >
              {`More ${pod.name} Info`}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
