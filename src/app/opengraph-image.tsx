import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "Proof of Drink";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Font
  //   const revue = fetch(
  //     new URL("../../public/fonts/revue.woff", import.meta.url)
  //   ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div className="flex flex-row justify-between items-center flex-wrap w-full p-5 sm:p-10 gap-3 sm:gap-11 border-b border-broodRed sticky top-0 bg-broodBlack">
        <h1 className="text-3xl headline-sm">Proof of Drink</h1>
        <h2 className="text-sm sm:text-lg text-right sm:text-center w-full sm:w-40 font-sans text-broodRed">
          by BROOD.BEER
        </h2>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
      //   fonts: [
      //     {
      //       name: "Revue",
      //       data: await revue,
      //       style: "normal",
      //       weight: 400,
      //     },
      //   ],
    }
  );
}
