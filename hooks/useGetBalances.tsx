"use client";

import { useQuery } from "@tanstack/react-query";
import Hash from "@/lib/types/Hash";
import { chains } from "@/lib/chains/chains";
import { getApiKey } from "@/lib/env";
import formatBN from "@/lib/utils/formatBN";

export type Balance = {
  value: bigint;
  tokenName: string;
  usdValue: number;
  totalValueInUsd: number;
};

export type BalancesData = {
  balances: Balance[];
  totalNetWorth: string;
};

const fetchTokenToUsd = async (tokenName: string, amount: number) => {
  const response = await fetch(
    `https://api.coinconvert.net/convert/${tokenName}/usd?amount=${amount}`
  );
  const data = await response.json();
  return data.USD;
};

const fetchBalance = async (
  address: Hash | undefined
): Promise<BalancesData> => {
  if (!address) return { balances: [], totalNetWorth: "0" };

  const balancePromises = chains.map(async (chain) => {
    const apiKey = getApiKey(chain.name);
    const response = await fetch(
      `${chain.url}/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    );
    const data = await response.json();
    return {
      value: BigInt(data.result),
      tokenName: chain.token,
    };
  });

  const balances = await Promise.all(balancePromises);

  // Fetch conversion rates and calculate USD values
  const balancesWithUsd = await Promise.all(
    balances.map(async (balance) => {
      const usdValueForOneToken = await fetchTokenToUsd(
        balance.tokenName?.toLowerCase(),
        1
      );
      const convertedValueInNumber = Number(formatBN(balance.value, 18, 10));
      const totalValueInUsd = (
        +convertedValueInNumber * usdValueForOneToken
      ).toFixed(2);

      return {
        ...balance,
        usdValue: usdValueForOneToken?.toFixed(2),
        totalValueInUsd: Number(totalValueInUsd),
      };
    })
  );

  // Calculate total net worth
  const totalNetWorth = balancesWithUsd.reduce((sum, balance) => {
    return sum + (balance.totalValueInUsd || 0);
  }, 0);

  return {
    balances: balancesWithUsd,
    totalNetWorth: totalNetWorth.toLocaleString(),
  };
};

const useGetBalances = (address: Hash | undefined) => {
  const { data, isLoading, isError } = useQuery<BalancesData>({
    queryKey: ["balances", address],
    queryFn: () => fetchBalance(address),
    enabled: !!address,
  });

  return {
    data: data,
    isLoading,
    isError,
  };
};

export default useGetBalances;
