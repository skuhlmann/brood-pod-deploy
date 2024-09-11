/* eslint-disable @next/next/no-img-element */
import { PodList } from "@/components/pod-list";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 mt-10 px-5 pt-5 pb-10 border-b border-broodGreen">
        <div className="flex flex-row justify-space-between items-center gap-10">
          <img className="h-20 sm:h-44 md:h-60" src="/badge.svg" alt="badge" />
          <img
            className="h-20 sm:h-44 md:h-60"
            src="/badge-1.svg"
            alt="badge"
          />
          <img
            className="h-20 sm:h-44 md:h-60"
            src="/badge-2.svg"
            alt="badge"
          />
        </div>

        <h2 className="font-sans headline-sm text-4xl text-center">
          COLLECTING LIQUIDITY
        </h2>
        <p className="body-text-md text-center">
          Ibu yeast bottle finishing cider Biere hopping de lagering Abv Amber,
          back microbrewery primary pilsner chiller Becher additive Additive
          bitter caramel dextrin, Bittering length brewing imperial.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 mt-10 px-5 pt-3 pb-10 border-b border-broodGreen">
        <h2 className="font-sans headline-sm text-xl text-center">
          What is a POD?
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-3">
          <div className="border border-broodRed p-5 w-full sm:w-5/12">
            <p className="text-base text-center">
              PROOF OF DRINK: Ibu yeast bottle finishing cider Biere hopping de
              lagering Abv Amber
            </p>
          </div>
          <div className="border border-broodRed p-5 w-full sm:w-5/12">
            <p className="text-base text-center">
              PROTOCOL: Microbrewery primary pilsner chiller Becher additive
              Additive bitter caramel dextrin, Bittering length brewing
              imperial.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 mt-10">
        <h2 className="font-sans headline-sm text-xl text-center">
          Who is using POD?
        </h2>
        <PodList />
      </div>
    </>
  );
}
