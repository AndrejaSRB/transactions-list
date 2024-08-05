import { chains } from "@/lib/chains/chains";
import Chain from "@/lib/types/Chain";

export const getTokenName = (
  chainId: number | undefined
): string | undefined => {
  if (!chainId) return "N/A";
  const chain = chains.find((chain: Chain) => chain.chainId === chainId);

  return chain?.token;
};
