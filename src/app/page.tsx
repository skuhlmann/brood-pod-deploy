import Image from "next/image";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { ACTIVE_PODS } from "@/lib/pod-data";
import Link from "next/link";

export default function Home() {
  const pods = ACTIVE_PODS;

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10">
      <Image src="/logo_footer.svg" alt="logo" width="350" height="350" />
      <h2 className="text-4xl text-center font-bold">
        The Oxidized Noble Bitter Protocol
      </h2>
      <p className="text-center">
        Ibu yeast bottle finishing cider Biere hopping de lagering Abv Amber,
        back microbrewery primary pilsner chiller Becher additive Additive
        bitter caramel dextrin, Bittering length brewing imperial.
      </p>

      <div className="flex flex-col items-center gap-5 mt-10">
        {pods &&
          pods.map((pod) => {
            return (
              <Link key={pod.tokenId} href={`/leaderboard/${pod.tokenId}`}>
                <div className="hover:bg-broodRed">
                  <PodOverviewCard tokenId={pod.tokenId} size="sm" />
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
