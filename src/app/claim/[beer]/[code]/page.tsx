import ClaimPod from "@/components/claim-pod";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { getTokenIdFromName, TOKEN_CONFIG } from "@/config/constants";

export default function Claim({
  params,
}: {
  params: { beer: string; code: string };
}) {
  const tokenId = getTokenIdFromName(params.beer);

  if (!tokenId) return null;

  return (
    <>
      <PodOverviewCard tokenId={tokenId} size="lg" />
      <ClaimPod tokenId={tokenId} claimCode={params.code} />
    </>
  );
}
