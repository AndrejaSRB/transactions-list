"use client";
import Hash from "@/lib/types/Hash";
import useGetEtheriumTransactions from "./useGetEtheriumTransactions";
import useGetPolygonTransactions from "./useGetPolygonTransactions";
import TableColumn from "@/app/[addressHash]/types/TableColumn";
import { useCallback, useMemo, useState } from "react";
import { mainnet, polygon } from "wagmi/chains";

const useTableData = (addressHash: Hash | undefined) => {
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(
    TableColumn.TIMESTAMP
  );
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: polygonTransactions,
    isLoading: polygonIsLoading,
    isEmpty: polygonIsEmpty,
  } = useGetPolygonTransactions({
    address: addressHash,
  });

  const {
    data: etheriumTransactions,
    isLoading: etheriumIsLoading,
    isEmpty: etheriumIsEmpty,
  } = useGetEtheriumTransactions({
    address: addressHash,
  });

  const presentedChainId = useMemo(() => {
    if (!etheriumIsEmpty) return mainnet.id;
    if (!polygonIsEmpty) return polygon.id;
    return undefined;
  }, [polygonIsEmpty, etheriumIsEmpty]);

  const sortedProducts = useMemo(() => {
    const transactions = [
      ...(etheriumTransactions || []),
      ...(polygonTransactions || []),
    ];

    return transactions.sort((a, b) => {
      if (sortColumn) {
        if (sortOrder === "asc") {
          return a[sortColumn] < b[sortColumn] ? -1 : 1;
        } else {
          return a[sortColumn] > b[sortColumn] ? -1 : 1;
        }
      }
      return 0;
    });
  }, [etheriumTransactions, polygonTransactions, sortColumn, sortOrder]);

  const handleSort = useCallback(
    (column: TableColumn) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    },
    [sortColumn, sortOrder]
  );

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
    isLoading: polygonIsLoading || etheriumIsLoading,
    isEmpty: etheriumIsEmpty && polygonIsEmpty, // Show empty state only if both are empty,
    sortedProducts,
    handleSort,
    sortSvg,
    presentedChainId,
  };
};

export default useTableData;
