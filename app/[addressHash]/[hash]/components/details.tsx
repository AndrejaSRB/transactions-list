"use client";
import Link from "next/link";
import Detail from "./detail";
import Hash from "@/lib/types/Hash";
import Skeleton from "@/components/skeleton";
import useTransactionDetails from "@/hooks/useTransactionDetailts";
import { notFound } from "next/navigation";
import formatBN from "@/lib/utils/formatBN";
import { ETHER_SCAN, POLYGON_SCAN } from "@/lib/constants";
import { polygon } from "wagmi/chains";
import isAddressPartOfTransaction from "@/lib/utils/isAddressPartOfTransaction";
import ellipsis from "@/lib/utils/ellipsis";

const Details = ({ hash, addressHash }: { hash: Hash; addressHash: Hash }) => {
  const { data, isLoading, chainId, isFetched } = useTransactionDetails(hash);

  const isPolygon = chainId === polygon.id;

  // Once when the data is fetched we are checking if data exist or if the address is not part of the transaction, in that case we are pushing user to the not found page
  if (
    isFetched &&
    (data === undefined ||
      (data?.from &&
        data?.to &&
        !isAddressPartOfTransaction(addressHash, data?.from, data?.to)))
  ) {
    return notFound();
  }

  console.log("elip", ellipsis("0xAd36FA05C9BD878fb3b7C8032251A609cfe3b4e6"));

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
          value={`${formatBN(data?.amount)} ${isPolygon ? "MATIC" : "ETH"}`}
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
              value={`${data?.transactionFee} ${isPolygon ? "MATIC" : "ETH"}`}
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
            href={`${isPolygon ? POLYGON_SCAN : ETHER_SCAN}/${hash}`}
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
