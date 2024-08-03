"use client";

import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

export const WagmiRuntime = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={config}>{children}</WagmiProvider>
);

export default WagmiRuntime;
