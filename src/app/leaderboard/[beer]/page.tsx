import { LeaderList } from "@/components/leader-list";
import { PodOverviewCard } from "@/components/pod-overview-card";

export default function Leaderboard({ params }: { params: { beer: string } }) {
  return (
    <>
      <PodOverviewCard tokenId={params.beer} size="lg" />
      <LeaderList tokenId={params.beer} />
    </>
  );
}
