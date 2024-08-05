import { chains } from "@/lib/chains/chains";
import Chain from "@/lib/types/Chain";

export const getChainDetailsURL = (
  chainId: number | undefined
): string | undefined => {
  if (!chainId) return "#";
  const chain = chains.find((chain: Chain) => chain.chainId === chainId);

  return `https://${chain?.url}/tx`;
};
