import { EnsInput } from "@/components/ens-input";

export default function Claim({ params }: { params: { beer: string } }) {
  return (
    <main>
      <div>beer: {params.beer}</div>
      <h2>CLAIM</h2>
      <EnsInput />
    </main>
  );
}
