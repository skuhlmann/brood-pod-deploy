import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center flex-wrap w-full p-10 gap-11">
      <div>
        <Link href="/">
          <h2 className="text-2xl sm:text-5xl text-center font-sans text-broodRed">
            BROOD.BEER
          </h2>
        </Link>
      </div>
      <h1 className="text-6xl sm:text-9xl text-center headline">
        Proof of Drink
      </h1>
    </div>
  );
}
