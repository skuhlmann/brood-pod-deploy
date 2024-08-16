import type { Metadata, Viewport } from "next";
import { Uncial_Antiqua, Source_Sans_3 } from "next/font/google";
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

// Uncial Antiqua
// Source Sans Pro

const unical = Uncial_Antiqua({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Proof of Drink",
  description: "From Raid Brood",
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
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={cn(
          unical.variable,
          sourceSans.variable,
          "bg-black text-white font-sans text-2xl"
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
