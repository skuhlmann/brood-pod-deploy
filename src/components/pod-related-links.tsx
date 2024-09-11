"use client";

import { usePodToken } from "@/hooks/usePodToken";

export function PodRelatedLinks({ tokenId }: { tokenId: string }) {
  const { podToken, meta } = usePodToken({ tokenId });

  if (!podToken || !meta) return null;

  return (
    <div className="flex flex-row flex-wrap gap-10 w-full p-5 border border-broodWhite">
      <div>
        <p className="text-base font-bold mb-1">Related Link 1</p>
      </div>
      <div>
        <p className="text-base font-bold mb-1">Related Link 2</p>
      </div>
      <div>
        <p className="text-base font-bold mb-1">Related Link 3</p>
      </div>
    </div>
  );
}
