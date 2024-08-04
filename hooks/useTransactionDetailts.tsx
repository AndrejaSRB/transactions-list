"use client";

import Hash from "@/lib/types/Hash";
import calculateTransactionFee from "@/lib/utils/calculateTransactionFee";
import formatTransactionTimestamp from "@/lib/utils/formatTransactionTimestamp";
import { useBlock, useTransaction, useTransactionReceipt } from "wagmi";
import useGetChainID from "./useGetChainID";

const useTransactionDetails = (hash: Hash) => {
  const {
    chainId,
    isLoading: isLoadingChainId,
    isFetched: isFetchedChainId,
  } = useGetChainID(hash);

  const {
    data,
    isLoading: isLoadingTransaction,
    isFetched: isFetchedTransaction,
  } = useTransaction({
    chainId,
    hash: hash,
    query: {
      enabled: !!chainId && !!hash,
    },
  });

  const { data: block } = useBlock({
    chainId,
    blockNumber: data?.blockNumber,
    query: {
      enabled: !!chainId && !!data?.blockNumber && isFetchedTransaction,
    },
  });

  const {
    data: receipt,
    isLoading: isLoadingReceipt,
    isFetched: isFetchedReceipt,
  } = useTransactionReceipt({
    chainId,
    hash: hash,
    query: {
      enabled: !!chainId && !!hash,
    },
  });

  const isLoading =
    isLoadingTransaction || isLoadingReceipt || isLoadingChainId;

  const isFetched =
    isFetchedTransaction && isFetchedReceipt && isFetchedChainId;

  const transactionFee = calculateTransactionFee(
    receipt?.gasUsed,
    receipt?.effectiveGasPrice
  );

  return {
    data: data && {
      timestamp: block?.timestamp
        ? formatTransactionTimestamp(block?.timestamp)
        : "",
      amount: data?.value,
      transactionFee: transactionFee,
      gasPrice: receipt?.effectiveGasPrice,
      status: receipt?.status,
      from: receipt?.from,
      to: receipt?.to,
    },
    isLoading,
    chainId,
    isFetched,
  };
};

export default useTransactionDetails;
