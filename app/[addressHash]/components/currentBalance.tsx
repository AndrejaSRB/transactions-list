"use client";
import Skeleton from "@/components/skeleton";
import Hash from "@/lib/types/Hash";
import formatBN from "@/lib/utils/formatBN";
import { useBalance } from "wagmi";
import useTableData from "@/hooks/useTableData";

const CurrentBalance = ({ addressHash }: { addressHash: Hash }) => {
  const { presentedChainId, isLoading: isLoadingTableData } =
    useTableData(addressHash);

  const { data, isLoading } = useBalance({
    chainId: presentedChainId,
    address: addressHash,
    query: {
      enabled: !!presentedChainId && !isLoadingTableData,
    },
  });

  return (
    <div className="mt-4 flex items-center gap-2">
      <h2 className="text-white/80">Current Balance:</h2>

      {isLoading ? (
        <Skeleton />
      ) : (
        <span className="text-sm italic text-white">
          {data ? `${formatBN(data?.value)} ${data?.symbol}` : 0}
        </span>
      )}
    </div>
  );
};

export default CurrentBalance;
