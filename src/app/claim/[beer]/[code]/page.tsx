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
      <div className="my-5">
        <ClaimPod tokenId={tokenId} claimCode={params.code} />
      </div>
      <div className="p-4 sm:p-2">
        <PodOverviewCard tokenId={tokenId} size="lg" />
      </div>
    </>
  );
}
