import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Bungee } from "next/font/google";
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

// Bungee
// Source Sans Pro

const bungee = Bungee({
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
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={cn(
          bungee.variable,
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
