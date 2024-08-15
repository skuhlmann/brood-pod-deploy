import Image from "next/image";
import { PiBeerBottle } from "react-icons/pi";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center flex-wrap w-full p-10 gap-11">
      <div className="text-broodRed hidden sm:block ">
        <Image src="/logo_footer.svg" alt="logo" width="150" height="150" />
      </div>
      <div className="text-broodRed sm:hidden">
        <Image src="/logo_footer.svg" alt="logo" width="75" height="75" />
      </div>
      <h1 className="font-serif text-5xl sm:text-8xl text-center text-broodRed">
        Proof of Drink
      </h1>
    </div>
  );
}
