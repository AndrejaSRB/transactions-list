"use client";

import Hash from "@/lib/types/Hash";
import calculateTransactionFee from "@/lib/utils/calculateTransactionFee";
import formatBN from "@/lib/utils/formatBN";
import formatTransactionTimestamp from "@/lib/utils/formatTransactionTimestamp";
import { useBlock, useTransaction, useTransactionReceipt } from "wagmi";

const useTransactionDetails = (hash: Hash) => {
  const {
    data,
    dataUpdatedAt,
    isLoading: isLoadingTransaction,
  } = useTransaction({
    hash: hash,
  });

  const { data: block, isLoading: isLoadingBlock } = useBlock({
    blockNumber: data?.blockNumber,
  });

  const { data: receipt, isLoading: isLoadingReceipt } = useTransactionReceipt({
    hash: hash,
  });

  console.log("receipt", receipt);

  const isLoading = isLoadingTransaction || isLoadingReceipt || isLoadingBlock;

  const transactionFee = calculateTransactionFee(
    receipt?.gasUsed,
    receipt?.effectiveGasPrice
  );

  return {
    data: data && {
      timestamp: formatTransactionTimestamp(block?.timestamp),
      amount: data?.value,
      transactionFee: transactionFee,
      gasPrice: receipt?.effectiveGasPrice,
      status: receipt?.status,
      from: receipt?.from,
      to: receipt?.to,
    },
    isLoading,
    chainId: data?.chainId,
  };
};

export default useTransactionDetails;
