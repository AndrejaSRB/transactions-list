"use client";

import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { chains } from "./chains/chains";

const transports = chains.reduce((acc, chain) => {
  acc[chain.chainId] = http();
  return acc;
}, {} as Record<number, ReturnType<typeof http>>);

export const config = createConfig({
  chains: [mainnet, polygon],
  transports,
});

export const WagmiRuntime = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={config}>{children}</WagmiProvider>
);

export default WagmiRuntime;
