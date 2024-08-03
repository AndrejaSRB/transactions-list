import { ReactNode } from "react";
import TableColumn from "../types/TableColumn";
import ucfirst from "@/lib/utils/ucfirst";

const TableHead = ({
  label,
  hasSorting = false,
  sortSvg,
  handleSort,
}: {
  label: TableColumn;
  hasSorting?: boolean;
  sortSvg: (column: TableColumn) => ReactNode;
  handleSort: (column: TableColumn) => void;
}) => {
  return (
    <th
      onClick={hasSorting ? () => handleSort(label) : undefined}
      className={`p-4 border-b border-rose-900/50 text-left select-none ${
        hasSorting && "cursor-pointer"
      }`}>
      <div className="flex items-center">
        <p className="block text-sm antialiased font-bold text-white leading-none opacity-70">
          {ucfirst(label)}
        </p>
        {hasSorting && sortSvg(label)}
      </div>
    </th>
  );
};

export default TableHead;
