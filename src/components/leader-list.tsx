"use client";

import Image from "next/image";
import { useNftOwners } from "@/hooks/useNftOwners";
import { LeaderItem } from "./leader-item";

export function LeaderList({ tokenId }: { tokenId: string }) {
  // const { data } = useNftOwners({
  //   tokenId: tokenId,
  // });

  // hook to fetch, filter by tokenid and sort/transform
  //
  const data = [
    {
      ownerAddress: "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF",
      tokenBalances: [
        {
          tokenId: "1",
          balance: "10",
        },
      ],
    },
    {
      ownerAddress: "0x017E1f81b2E17Bd02c4cD337FCbEaBE01a0b4bf0",
      tokenBalances: [
        {
          tokenId: "1",
          balance: "6",
        },
      ],
    },
    {
      ownerAddress: "0x0248C638c7Df9a293102aec588743624a8766646",
      tokenBalances: [
        {
          tokenId: "1",
          balance: "4",
        },
      ],
    },
    {
      ownerAddress: "0x41834d5Edcd47EC77ce38Cb14e1F92D1aE71B7Eb",
      tokenBalances: [
        {
          tokenId: "1",
          balance: "1",
        },
      ],
    },
  ];

  if (!data) return null;

  return (
    <>
      <h2 className="text-center text-3xl font-bold mt-5">Leaders</h2>

      <div className="p-4 flex flex-col gap-5">
        {data.map((row) => {
          return <LeaderItem row={row} key={row.ownerAddress} />;
        })}
      </div>
    </>
  );
}
