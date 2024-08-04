"use client";
import env from "@/lib/env";
import Hash from "@/lib/types/Hash";
import { useQuery } from "@tanstack/react-query";

export const fetchPolygonTransactions = async (address: Hash | undefined) => {
  const response = await fetch(
    `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`
  );
  const data = await response.json();
  return data.result;
};

const useGetPolygonTransactions = ({
  address,
}: {
  address: Hash | undefined;
}) => {
  const { data, isLoading, isError, isFetched, error } = useQuery({
    enabled: !!address,
    queryKey: ["polygon-transactions", address],
    queryFn: () => fetchPolygonTransactions(address),
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

export default useGetPolygonTransactions;
