import formatBN from "@/lib/utils/formatBN";
import formatTimestamp from "@/lib/utils/formatTimestamp";
import Link from "next/link";
import TableCellHash from "./tableCellHash";

const TableRow = ({
  hash,
  timestamp,
  amount,
  see_more_url,
}: {
  hash: string;
  timestamp: number;
  amount: bigint;
  see_more_url: string;
}) => (
  <tr className="border border-rose-900/20">
    <TableCellHash hash={hash} />

    <td className="p-4">
      <p className="block text-sm antialiased font-normal leading-normal">
        {formatTimestamp(timestamp)}
      </p>
    </td>

    <td className="p-4">
      <p className="block text-sm antialiased font-normal leading-normal">
        {formatBN(amount)}
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
