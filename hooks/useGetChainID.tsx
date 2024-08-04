import env from "@/lib/env";

import Hash from "@/lib/types/Hash";
import { useQuery } from "@tanstack/react-query";
import { mainnet, polygon } from "wagmi/chains";

const STATIC_PART_URL =
  "api?module=transaction&action=gettxreceiptstatus&txhash";

async function getChainId(txHash: Hash) {
  try {
    const [ethResponse, polygonResponse] = await Promise.all([
      fetch(
        `https://api.etherscan.io/${STATIC_PART_URL}=${txHash}&apikey=${env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.polygonscan.com/${STATIC_PART_URL}=${txHash}&apikey=${env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`
      ).then((res) => res.json()),
    ]);

    const ethStatus = ethResponse.result?.status;
    const polygonStatus = polygonResponse.result?.status;
    return {
      chainId:
        ethStatus === "1"
          ? mainnet.id
          : polygonStatus === "1"
          ? polygon.id
          : undefined,
    };
  } catch (error) {
    console.error("Error fetching chain ID:", error);
    return { chainId: undefined };
  }
}

const useGetChainID = (txHash: Hash) => {
  const { data, error, isLoading, isFetched } = useQuery({
    enabled: !!txHash,
    queryKey: ["getChainId", txHash],
    queryFn: () => getChainId(txHash),
  });

  return {
    chainId: data?.chainId,
    isLoading,
    error,
    isFetched,
  };
};

export default useGetChainID;
