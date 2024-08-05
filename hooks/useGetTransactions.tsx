"use client";

import { useQuery } from "@tanstack/react-query";
import Hash from "@/lib/types/Hash";
import Chain from "@/lib/types/Chain";
import { chains } from "@/lib/chains/chains";
import { getApiKey } from "@/lib/env";

const fetchAllTransactions = async (address: Hash | undefined) => {
  if (!address) return [];

  const promises = chains.map(async (chain: Chain) => {
    const apiKey = getApiKey(chain.name);
    if (!apiKey) {
      console.warn(`API key not found for chain: ${chain.name}`);
      return { chainId: chain.chainId, transactions: [] };
    }

    const url = `${chain.url}/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const transactions = data.result.slice(0, 100) || [];

      return {
        name: chain.name,
        token: chain.token,
        transactions,
      };
    } catch (error) {
      console.error(`Error fetching data for chain ${chain.name}:`, error);
      return { name: chain.name, token: chain.token, transactions: [] };
    }
  });

  const allChainData = await Promise.all(promises);

  // Filter out chains with empty transactions
  return allChainData.filter((chainData) => chainData.transactions.length > 0);
};

const useGetAllTransactions = ({ address }: { address: Hash | undefined }) => {
  const { data, isLoading, isError, isFetched, error } = useQuery({
    enabled: !!address,
    queryKey: ["all-transactions", address],
    queryFn: () => fetchAllTransactions(address),
  });

  return {
    data: data || [],
    isLoading,
    isError,
    isFetched,
    error,
    isEmpty: data?.length === 0,
  };
};

export default useGetAllTransactions;
