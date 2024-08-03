import ellipsis from "@/lib/utils/ellipsis";
import formatTimestamp from "@/lib/utils/formatTimestamp";
import Link from "next/link";

const TableRow = ({
  hash,
  timestamp,
  amount,
  see_more_url,
}: {
  hash: string;
  timestamp: number;
  amount: number;
  see_more_url: string;
}) => (
  <tr className="border border-rose-900/20">
    <td className="p-4">
      <p className="block text-sm antialiased font-normal leading-normal lg:hidden">
        {ellipsis(hash)}
      </p>

      <p className="hidden lg:block xl:hidden text-sm antialiased font-normal leading-normal">
        {ellipsis(hash, 8)}
      </p>

      <p className="hidden xl:block m-auto text-left text-sm antialiased font-normal leading-normal">
        {hash}
      </p>
    </td>

    <td className="p-4">
      <p className="block text-sm antialiased font-normal leading-normal">
        {formatTimestamp(timestamp)}
      </p>
    </td>

    <td className="p-4">
      <p className="block text-sm antialiased font-normal leading-normal">
        {amount}
      </p>
    </td>

    <td className="p-4">
      <Link
        href={see_more_url}
        className="block text-sm antialiased font-medium leading-normal transition-colors text-rose-500 hover:text-rose-600">
        See More
      </Link>
    </td>
  </tr>
);

export default TableRow;
