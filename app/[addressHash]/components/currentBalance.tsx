"use client";
import Skeleton from "@/components/skeleton";
import Hash from "@/lib/types/Hash";
import useGetBalances from "@/hooks/useGetBalances";
import formatBN from "@/lib/utils/formatBN";
import LoadingState from "./loadingState";

const headerStyles =
  "w-1/4 lg:p-4 text-xs text-center lg:text-sm antialiased font-bold text-white leading-none opacity-70";

const mobileLabelStyles =
  "w-1/2 pl-4 text-xs lg:text-sm antialiased font-bold text-white leading-none opacity-70 lg:hidden";

const cellStyle =
  "w-1/2 lg:w-full lg:p-4 text-xs text-left lg:text-center lg:text-lg antialiased font-bold text-white leading-none";

const skeletonStyle = "w-1/4 flex justify-center items-center lg:p-4";

const CurrentBalance = ({ addressHash }: { addressHash: Hash }) => {
  const { data, isLoading } = useGetBalances(addressHash);

  return (
    <div className="mt-4 flex flex-col gap-2 mb-4 w-full">
      <h2 className="text-sm lg:text-2xl mb-4 lg:mb-6 uppercase font-bold text-rose-600 text-center">
        Current Balance
      </h2>

      <div className="bg-rose-900/30 w-full rounded mb-4 lg:mb-8 p-4">
        <div className="p-1 bg-slate-900">
          <div className="items-center  border-b border-rose-500/50 hidden lg:flex">
            <span className={headerStyles}>Token</span>
            <span className={headerStyles}>Balance</span>
            <span className={headerStyles}>1 USD</span>
            <span className={headerStyles}>Total USD</span>
          </div>

          {isLoading && <LoadingState />}

          {!isLoading &&
            data?.balances?.map((balance, index) => (
              <div
                className={`flex flex-col lg:flex-row lg:items-center py-2 ${
                  index !== data?.balances?.length - 1
                    ? "border-b border-rose-500/50"
                    : ""
                }`}
                key={balance?.tokenName}>
                <div className="flex items-center pb-2 lg:pb-0 lg:w-1/4">
                  <span className={mobileLabelStyles}>Token:</span>
                  <span className={cellStyle}>{balance?.tokenName}</span>
                </div>

                <div className="flex items-center pb-2 lg:pb-0 lg:w-1/4">
                  <span className={mobileLabelStyles}>Balance:</span>
                  <span className={cellStyle}>
                    {formatBN(balance?.value, 18, 5)}
                  </span>
                </div>

                <div className="flex items-center pb-2 lg:pb-0 lg:w-1/4">
                  <span className={mobileLabelStyles}>1 USD:</span>
                  <span className={cellStyle}>${balance?.usdValue}</span>
                </div>

                <div className="flex items-center pb-2 lg:pb-0 lg:w-1/4">
                  <span className={mobileLabelStyles}>Total USD:</span>
                  <span className={cellStyle}>
                    ${balance?.totalValueInUsd?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

          <div className="flex items-center border-t border-rose-500/50">
            <div className="hidden lg:flex items-center w-full">
              <span className={cellStyle} />
              <span className={cellStyle} />
              <span className="w-full p-4 text-xs text-left lg:text-center lg:text-lg antialiased font-bold text-white leading-none opacity-70">
                TOTAL NET WORTH:
              </span>
              {isLoading ? (
                <div className="w-full p-4 flex justify-center">
                  <Skeleton />
                </div>
              ) : (
                <span className={cellStyle}>${data?.totalNetWorth ?? 0}</span>
              )}
            </div>

            <div className="flex gap-1 lg:hidden w-full items-center">
              <span className={mobileLabelStyles}>TOTAL NET WORTH:</span>
              <span className="w-1/2 lg:w-1/4 py-2 lg:p-4 text-sm lg:text-center lg:text-xl antialiased font-bold text-white leading-none">
                {isLoading ? (
                  <div className={skeletonStyle}>
                    <Skeleton />
                  </div>
                ) : (
                  `$${data?.totalNetWorth ?? 0}`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBalance;
