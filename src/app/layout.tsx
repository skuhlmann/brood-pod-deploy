import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { connector as alias } from "alias-wallet";
import {
  cookieToInitialState,
  cookieStorage,
  createConfig,
  createStorage,
  custom,
  http,
} from "wagmi";
import { localhost } from "wagmi/chains";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { wagmiConfig } from "@/config/wagmi";
import { cn } from "@/lib/utils";
import WrapperLayout from "@/components/layout/wrapper";

// Revue
// Source Sans Pro

const revue = localFont({
  src: "../../public/fonts/revue.woff",
  variable: "--font-sans",
  weight: "400",
});

const sourceSerif = EB_Garamond({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Proof of Drink",
  description:
    "Pooling our Web3 powers to conspire against Moloch in taverns around the world.",
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
          sourceSerif.variable,
          "bg-black text-broodWhite font-serif text-3xl"
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
