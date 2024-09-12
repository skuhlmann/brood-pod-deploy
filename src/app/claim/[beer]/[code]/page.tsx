import ClaimPod from "@/components/claim-pod";
import { PodBenefits } from "@/components/pod-benefits";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { PodRelatedLinks } from "@/components/pod-related-links";
import { getTokenIdFromName, TOKEN_CONFIG } from "@/config/constants";

export default function Claim({
  params,
}: {
  params: { beer: string; code: string };
}) {
  const tokenId = getTokenIdFromName(params.beer);

  if (!tokenId) return null;

  return (
    <div className="sm:w-144">
      <h2 className="font-sans headline-sm text-4xl text-center mt-10">
        Collect
      </h2>
      <div className="mt-8 p-4 sm:p-2 ">
        <PodOverviewCard tokenId={tokenId} size="sm" />
      </div>

      <div className="p-4 sm:p-2">
        <ClaimPod tokenId={tokenId} claimCode={params.code} />
      </div>

      <div className="mt-8 p-4 sm:p-2">
        <PodBenefits tokenId={tokenId} />
      </div>

      <div className="mt-8 p-4 sm:p-2">
        <PodRelatedLinks tokenId={tokenId} />
      </div>
    </div>
  );
}
