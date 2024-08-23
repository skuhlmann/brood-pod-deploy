import ClaimInput from "@/components/claim-input";
import { PodOverviewCard } from "@/components/pod-overview-card";

export default function Claim({ params }: { params: { beer: string } }) {
  return (
    <>
      <PodOverviewCard tokenId={params.beer} size="lg" />
      <ClaimInput tokenId={params.beer} />
    </>
  );
}
