"use client";

import TableRow from "./tableRow";
import TableHead from "./tableHead";
import Hash from "@/lib/types/Hash";
import { columns } from "../config";
import TableColumn from "../types/TableColumn";
import SkeletonRow from "./skeletonRow";
import Empty from "./empty";
import useTableData from "@/hooks/useTableData";

const Table = ({ addressHash }: { addressHash: Hash }) => {
  const { sortedProducts, sortSvg, handleSort, isLoading, isEmpty } =
    useTableData(addressHash);

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll bg-slate-900 shadow-md rounded-xl border border-rose-900/50 mb-5 lg:mb-20">
      <table className="w-full text-left table-auto min-w-max">
        <thead className="bg-rose-900/50">
          <tr>
            {columns.map((column) => (
              <TableHead
                key={column}
                label={column}
                sortSvg={sortSvg}
                handleSort={handleSort}
                hasSorting={
                  column === TableColumn.TIMESTAMP ||
                  column === TableColumn.VALUE
                }
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonRow key={`table-skeleton-${index}`} />
            ))}

          {isEmpty && <Empty />}

          {!isLoading &&
            sortedProducts.map((transaction, index) => (
              <TableRow
                key={`${transaction.hash}-${index}`}
                hash={transaction.hash}
                amount={transaction.value}
                timestamp={transaction.timestamp || transaction.timeStamp}
                see_more_url={`${addressHash}/${transaction.hash}`}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
