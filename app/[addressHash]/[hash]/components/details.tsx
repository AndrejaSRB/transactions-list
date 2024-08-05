"use client";
import Link from "next/link";
import Detail from "./detail";
import Hash from "@/lib/types/Hash";
import Skeleton from "@/components/skeleton";
import useTransactionDetails from "@/hooks/useTransactionDetailts";
import { notFound } from "next/navigation";
import formatBN from "@/lib/utils/formatBN";
import { polygon } from "wagmi/chains";
import isAddressPartOfTransaction from "@/lib/utils/isAddressPartOfTransaction";
import ellipsis from "@/lib/utils/ellipsis";
import { getTokenName } from "@/lib/utils/getTokenName";
import { getChainDetailsURL } from "@/lib/utils/getChainDetailsURL";

const Details = ({ hash, addressHash }: { hash: Hash; addressHash: Hash }) => {
  const { data, isLoading, chainId, isFetchedChainId, isFetched } =
    useTransactionDetails(hash);

  const isPolygon = chainId === polygon.id;

  // Check if the user should be redirected to the notFound page:
  // 1. If the chainId has been fetched but is undefined, indicating the transaction
  //    doesn't exist on any supported chain.
  // 2. If all data has been fetched but the transaction details data are undefined,
  //    meaning no transaction information was found.
  // 3. If all data has been fetched, the transaction details are present, but the provided
  //    addressHash is neither the sender (`data.from`) nor the recipient (`data.to`).
  // If any of these conditions are met, trigger the notFound route.
  if (
    (isFetchedChainId && !chainId) ||
    (isFetched && data === undefined) ||
    (isFetched &&
      data?.from &&
      data?.to &&
      !isAddressPartOfTransaction(addressHash, data.from, data.to))
  ) {
    notFound();
  }

  return (
    <div>
      <div className="mt-6 flex w-full flex-col gap-x-4 border-t border-rose-900/40 ">
        <h4 className="text-sm font-semibold leading-6 px-6 pt-6">
          Other Details:
        </h4>

        <Detail
          label="Timestamp"
          value={data?.timestamp}
          isLoading={isLoading}
        />

        <Detail
          label="Amount"
          value={`${
            data?.amount !== undefined ? formatBN(data?.amount) : "N/A"
          } ${getTokenName(chainId)}`}
          isLoading={isLoading}
        />

        <div className="block lg:hidden">
          <Detail
            label="From"
            value={ellipsis(data?.from, 16)}
            isLoading={isLoading}
          />
        </div>

        <div className="hidden lg:block">
          <Detail label="From" value={data?.from} isLoading={isLoading} />
        </div>

        {data?.to && (
          <>
            <div className="block lg:hidden">
              <Detail
                label="To"
                value={ellipsis(data?.to, 16)}
                isLoading={isLoading}
              />
            </div>

            <div className="hidden lg:block">
              <Detail label="To" value={data?.to} isLoading={isLoading} />
            </div>
          </>
        )}

        <Detail label="Status" status={data?.status} isLoading={isLoading} />

        {data?.status === "success" && (
          <>
            <Detail
              label="Transaction Fee"
              value={`${data?.transactionFee} ${getTokenName(chainId)}`}
              isLoading={isLoading}
            />
            <Detail
              label="Gass Price"
              value={`${formatBN(data?.gasPrice, 9, 20)} Gwei`}
              isLoading={isLoading}
            />
          </>
        )}
      </div>

      <div className="mt-6 border-t border-rose-900/40 px-6 py-6">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Link
            href={`${getChainDetailsURL(chainId)}/${hash}`}
            target="_blank"
            passHref={true}
            className="text-sm font-semibold leading-6 transition-colors text-rose-500 hover:text-rose-600">
            Open on {isPolygon ? "Polygonscan" : "Etherscan"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <Link
        href={`/${addressHash}`}
        className="text-sm font-semibold leading-6 cursor-pointer">
        <div className="p-6 text-center bg-rose-800 hover:bg-rose-900 transition-colors rounded-b">
          <span className="text-white">Go back</span>
        </div>
      </Link>
    </div>
  );
};

export default Details;
