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
