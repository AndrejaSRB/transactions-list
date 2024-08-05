import { chains } from "@/lib/chains/chains";
import { getApiKey } from "@/lib/env";
import Hash from "@/lib/types/Hash";
import { useQuery } from "@tanstack/react-query";

const STATIC_PART_URL =
  "api?module=transaction&action=gettxreceiptstatus&txhash";

const getChainId = async (txHash: Hash) => {
  try {
    const results = await Promise.all(
      chains.map(async (chain) => {
        const apiKey = getApiKey(chain.name);
        const response = await fetch(
          `${chain.url}/${STATIC_PART_URL}=${txHash}&apikey=${apiKey}`
        ).then((res) => res.json());

        return {
          chainId: response.result?.status === "1" ? chain.chainId : undefined,
        };
      })
    );

    // Find the first chainId where the status is "1"
    const chainId = results.find(
      (result) => result.chainId !== undefined
    )?.chainId;

    return { chainId };
  } catch (error) {
    console.error("Error fetching chain ID:", error);
    return { chainId: undefined };
  }
};

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
