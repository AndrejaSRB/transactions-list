"use client";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import ellipsis from "@/lib/utils/ellipsis";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const TableCellHash = ({ hash }: { hash: string }) => {
  const handleCopy = () => {
    copy(hash);
    toast.success("Copied!", {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  return (
    <td
      className="p-4 flex items-center justify-start gap-1 cursor-pointer"
      onClick={handleCopy}>
      <p className="block text-sm antialiased font-normal leading-normal lg:hidden">
        {ellipsis(hash)}
      </p>

      <p className="hidden lg:block text-sm antialiased font-normal leading-normal">
        {ellipsis(hash, 8)}
      </p>

      <DocumentDuplicateIcon
        aria-hidden="true"
        className="h-5 w-5 flex-shrink-0 text-rose-500"
      />
    </td>
  );
};

export default TableCellHash;
