"use client";
import { useCallback, useMemo, useState } from "react";
import Hash from "@/lib/types/Hash";
import TableColumn from "@/app/[addressHash]/types/TableColumn";
import useGetAllTransactions from "./useGetTransactions";
import Tab from "@/lib/types/Tab";

const useTableData = (addressHash: Hash | undefined) => {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(
    TableColumn.TIMESTAMP
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // State for active tab
  const [activeTab, setActiveTab] = useState<number>(0);

  // Fetch all transactions
  const { data, isLoading, isEmpty } = useGetAllTransactions({
    address: addressHash,
  });

  // Handle tab switching
  const toggleTab = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
  }, []);

  // Get tabs based on data
  const tabs: Tab[] = useMemo(() => {
    if (!data) return [];

    return data
      .filter((chainData) => chainData.transactions.length > 0)
      .map((chainData, index) => ({
        index,
        name: chainData.name,
        token: chainData.token,
      }));
  }, [data]);

  // Get transactions for the active tab
  const activeTransactions = useMemo(() => {
    if (!data || !tabs[activeTab]) return [];

    return data[tabs[activeTab].index].transactions;
  }, [data, tabs, activeTab]);

  // Handle sorting
  const sortedTransactions = useMemo(() => {
    return [...activeTransactions].sort((a, b) => {
      if (sortColumn) {
        if (sortOrder === "asc") {
          return a[sortColumn] < b[sortColumn] ? -1 : 1;
        } else {
          return a[sortColumn] > b[sortColumn] ? -1 : 1;
        }
      }
      return 0;
    });
  }, [activeTransactions, sortColumn, sortOrder]);

  // Function to set sorting column and order
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

  // Helper function for displaying sort icon
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

  // Get the active token name
  const activeToken = useMemo(() => {
    return tabs[activeTab]?.token || "";
  }, [tabs, activeTab]);

  return {
    isLoading,
    isEmpty,
    sortedTransactions,
    handleSort,
    sortSvg,
    activeTab,
    tabs,
    toggleTab,
    activeToken,
  };
};

export default useTableData;
