import ClaimInput from "@/components/claim-input";
import { EnsInput } from "@/components/ens-input";
import { PodOverviewCard } from "@/components/pod-overview-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function Claim({ params }: { params: { beer: string } }) {
  return (
    <>
      <PodOverviewCard tokenId={params.beer} size="lg" />
      <ClaimInput tokenId={params.beer} />
    </>
  );
}
