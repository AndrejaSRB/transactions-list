"use client";
import Skeleton from "@/components/skeleton";
import Hash from "@/lib/types/Hash";
import formatBN from "@/lib/utils/formatBN";
import { useBalance } from "wagmi";

const CurrentBalance = ({ addressHash }: { addressHash: Hash }) => {
  const { data, isLoading } = useBalance({
    address: addressHash,
  });

  return (
    <div className="mt-4 flex items-center gap-2">
      <h2 className="text-white/80">Current Balance:</h2>

      {isLoading ? (
        <Skeleton />
      ) : (
        <span className="text-sm italic text-white">{`${formatBN(
          data?.value
        )} ${data?.symbol}`}</span>
      )}
    </div>
  );
};

export default CurrentBalance;
