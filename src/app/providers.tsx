"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { wagmiConfig } from "@/config/wagmi";

const queryClient = new QueryClient();

export default function Providers({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>) {
  return (
    // <WagmiProvider config={wagmiConfig} initialState={initialState}>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="midnight"
          customTheme={{
            "--ck-border-radius": "0px",
            "--ck-connectbutton-border-radius": "0px",
            "--ck-font-family": '"Nanum Gothic", sans-serif',
            "--ck-connectbutton-font-size": "16px",
            "--ck-connectbutton-color": "#c7cac2",
            "--ck-connectbutton-background": "#272b23",
            "--ck-connectbutton-hover-color": "#c7cac2",
            "--ck-connectbutton-hover-background": "white",
            "--ck-connectbutton-active-color": "c7cac2",
            "--ck-connectbutton-active-background": "#272b23",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
