import ClaimPod from "@/components/claim-pod";
import { PodOverviewCard } from "@/components/pod-overview-card";

export default function Claim({ params }: { params: { beer: string } }) {
  return (
    <>
      <PodOverviewCard tokenId={params.beer} size="lg" />
      <ClaimPod tokenId={params.beer} />
    </>
  );
}
