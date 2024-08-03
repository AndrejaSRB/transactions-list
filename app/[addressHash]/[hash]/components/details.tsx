import Link from "next/link";
import Detail from "./detail";
import { POLYGON_SCAN } from "@/lib/constants";
import Hash from "@/lib/types/Hash";
import Skeleton from "@/components/skeleton";

const Details = ({
  hash,
  addressHash,
  isLoading,
}: {
  hash: Hash;
  addressHash: Hash;
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="mt-6 flex w-full flex-col gap-x-4 border-t border-rose-900/40 ">
        <h4 className="text-sm font-semibold leading-6 px-6 pt-6">
          Other Details:
        </h4>

        <Detail label="Date" value="January 31, 2023" isLoading={isLoading} />

        <Detail label="Amount" value={20000000000000} isLoading={isLoading} />

        <Detail label="Status" status="success" isLoading={isLoading} />

        {/* TODO: Only if the transaction is was successful */}
        <Detail label="Fee" value={80000000000000} isLoading={isLoading} />
      </div>

      {/* TODO: Check the chainId from the response and redirect user to the etherscan or polygonscan */}
      <div className="mt-6 border-t border-rose-900/40 px-6 py-6">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Link
            href={`${POLYGON_SCAN}/${hash}`}
            target="_blank"
            passHref={true}
            className="text-sm font-semibold leading-6 transition-colors text-rose-500 hover:text-rose-600">
            Open on Polygonscan <span aria-hidden="true">&rarr;</span>
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
