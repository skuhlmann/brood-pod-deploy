import { LeaderList } from "@/components/leader-list";
import { PodOverviewCard } from "@/components/pod-overview-card";

export default function Leaderboard({ params }: { params: { beer: string } }) {
  return (
    <>
      <div className="mt-8 p-4 sm:p-2">
        <PodOverviewCard tokenId={params.beer} size="lg" />
      </div>
      <LeaderList tokenId={params.beer} />
    </>
  );
}
