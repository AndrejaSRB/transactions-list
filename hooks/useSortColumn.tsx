import { dummyTransactions } from "@/app/[addressHash]/dummyTransactions";
import TableColumn from "@/app/[addressHash]/types/TableColumn";
import { useState } from "react";

const useSortColumn = () => {
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedProducts = [...dummyTransactions].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === "asc") {
        return a[sortColumn] < b[sortColumn] ? -1 : 1;
      } else {
        return a[sortColumn] > b[sortColumn] ? -1 : 1;
      }
    } else {
      return 0;
    }
  });

  const handleSort = (column: TableColumn) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortSvg = (column: TableColumn) =>
    sortColumn === column ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        {sortOrder === "asc" ? (
          <path d="M7 10l5 5 5-5z" />
        ) : (
          <path d="M7 14l5-5 5 5z" />
        )}

        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ) : null;

  return {
    sortedProducts,
    handleSort,
    sortSvg,
  };
};

export default useSortColumn;
