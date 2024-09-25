/* eslint-disable @next/next/no-img-element */
import { PodList } from "@/components/pod-list";
import { ArrowRight } from "lucide-react";

const badges = ["badge-4.svg", "badge-2.svg", "badge-1.svg", "badge-3.svg"];

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 mt-10 px-5 pt-5 pb-10 border-b border-broodGreen lg:border-b-0">
        <div className="flex flex-row justify-space-between items-center gap-3 sm:gap-10">
          {badges.map((badgePath) => {
            return (
              <img
                className="h-16 sm:h-28 md:h-40 lg:h-56 xl:h-72"
                src={`/${badgePath}`}
                alt="badge"
                key={badgePath}
              />
            );
          })}
        </div>

        <h2 className="font-sans headline-sm text-4xl sm:text-6xl text-center">
          COLLECT LIQUIDITY
        </h2>
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-5 text-center text-lg sm:text-2xl sm:w-3/4">
          <p>Enjoy Liquid Refreshment</p>
          <ArrowRight size={32} className="text-broodRed" />
          <p>Collect Proof Of Drink</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 mt-10 px-5 pt-3 pb-10 border-b border-broodGreen lg:border-b-0">
        <h2 className="font-sans headline-sm text-xl text-center">
          What is a POD?
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-5">
          <div className="border border-broodRed p-5 w-full sm:w-4/12 shadow-broodGreen text-center">
            <p className="font-bold text-xl text-broodGreen mb-3">
              The Proof of Drink App
            </p>
            <p className="text-base">
              Visit our app to collect and view your PODs and see who else is
              collecting liquidity!
            </p>
          </div>
          <div className="border border-broodRed p-5 w-full sm:w-4/12 shadow-broodGreen text-center">
            <p className="font-bold text-xl text-broodGreen mb-3">
              The Proof of Drink Protocol
            </p>
            <p className="text-base ">
              A digi-drinkable platform. NFTs tied to in-your-hand drink
              releases. Work with{" "}
              <a
                href="https://brood.raidguild.org/"
                target="_blank"
                className="text-broodRed"
              >
                brood.beer{" "}
              </a>
              to launch your own!
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
