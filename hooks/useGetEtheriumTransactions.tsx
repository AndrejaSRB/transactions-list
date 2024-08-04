"use client";
import env from "@/lib/env";
import Hash from "@/lib/types/Hash";
import { useQuery } from "@tanstack/react-query";

const fetchEthereumTransactions = async (address: Hash | undefined) => {
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
  );
  const data = await response.json();
  return data.result;
};

const useGetEtheriumTransactions = ({
  address,
}: {
  address: Hash | undefined;
}) => {
  const { data, isLoading, isError, isFetched, error } = useQuery({
    enabled: !!address,
    queryKey: ["etherium-transactions", address],
    queryFn: () => fetchEthereumTransactions(address),
  });

  return {
    data: data?.slice(0, 100),
    isLoading,
    isError,
    isFetched,
    error,
    isEmpty: data?.length === 0,
  };
};

export default useGetEtheriumTransactions;
