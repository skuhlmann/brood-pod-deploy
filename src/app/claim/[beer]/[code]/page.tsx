import ClaimPod from "@/components/claim-pod";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { getTokenIdFromName } from "@/config/constants";

export default function Claim({
  params,
}: {
  params: { beer: string; code: string };
}) {
  const tokenId = getTokenIdFromName(params.beer);

  if (!tokenId || !params.code) return null;

  return (
    <div className="sm:w-144">
      <div className="mt-2 sm:mt-8 p-4 sm:p-2 ">
        <PodOverviewCard tokenId={tokenId} size="sm" />
      </div>

      <div className="p-4 sm:p-2">
        <ClaimPod tokenId={tokenId} claimCode={params.code} />
      </div>
    </div>
  );
}
