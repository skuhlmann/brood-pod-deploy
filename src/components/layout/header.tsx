import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-center flex-wrap w-full p-5 sm:p-10 gap-3 sm:gap-11 border-b border-broodRed sticky top-0 bg-black">
      <Link href="/">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/BROOD-steins-logo.svg"
            alt="logo"
            width="50"
            height="50"
            className="rounded-full"
          />
          <h1 className="text-3xl headline-sm">Proof of Drink</h1>
        </div>
      </Link>
      <h2 className="text-sm sm:text-lg text-right sm:text-center w-full sm:w-40 font-sans text-broodRed">
        by BROOD.BEER
      </h2>
    </div>
  );
}
