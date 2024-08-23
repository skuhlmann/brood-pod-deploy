import Image from "next/image";

import { PodList } from "@/components/pod-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10">
      <Image src="/logo_footer.svg" alt="logo" width="350" height="350" />
      <h2 className="text-4xl text-center font-bold">
        The Oxidized Noble Bitter Protocol
      </h2>
      <p className="text-center">
        Ibu yeast bottle finishing cider Biere hopping de lagering Abv Amber,
        back microbrewery primary pilsner chiller Becher additive Additive
        bitter caramel dextrin, Bittering length brewing imperial.
      </p>

      <div className="flex flex-col items-center gap-5 mt-10">
        <PodList />
      </div>
    </div>
  );
}
