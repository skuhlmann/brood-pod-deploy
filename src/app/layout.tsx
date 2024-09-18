import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { EB_Garamond, Nanum_Gothic } from "next/font/google";
import Providers from "./providers";
// alias
// import { connector as alias } from "alias-wallet";
// import {
//   cookieToInitialState,
//   cookieStorage,
//   createConfig,
//   createStorage,
//   custom,
//   http,
// } from "wagmi";
// import { localhost } from "wagmi/chains";
// import { headers } from "next/headers";
// import { wagmiConfig } from "@/config/wagmi";
import { cn } from "@/lib/utils";
import WrapperLayout from "@/components/layout/wrapper";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const revue = localFont({
  src: "../../public/fonts/revue.woff",
  variable: "--font-sans",
  weight: "400",
});

const interTight = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-body",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Proof of Drink",
  description: "Collecting Liquidity",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const initialState = cookieToInitialState(
  //   wagmiConfig,
  //   headers().get("cookie")
  // );
  const initialState = undefined;
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Proof of Drink" />
        <meta property="og:url" content="https://pod.brood.beer/" />
        <meta property="og:description" content="Collect Liquidity" />
        <meta
          property="og:image"
          content="https://pod.brood.beer/preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RaidBrood" />
        <meta name="twitter:title" content="Proof of Drink" />
        <meta name="twitter:description" content="Collect Liquidity" />
        <meta
          name="twitter:image"
          content="https://pod.brood.beer/twitter.png"
        />

        {/* 
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" /> */}
      </head>
      <body
        className={cn(
          revue.variable,
          interTight.variable,
          garamond.variable,
          "bg-broodBlack text-broodWhite font-body text-3xl"
        )}
      >
        <Providers initialState={initialState}>
          <WrapperLayout>{children}</WrapperLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
