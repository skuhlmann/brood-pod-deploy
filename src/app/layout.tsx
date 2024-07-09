import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { connector as alias } from 'alias-wallet';
import { cookieToInitialState, cookieStorage, createConfig, createStorage, custom, http } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { wagmiConfig } from "@/config/wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alias Client",
  description: "An example app with Alias integrated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
