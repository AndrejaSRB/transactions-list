"use client";

import Hash from "@/lib/types/Hash";
import ellipsis from "@/lib/utils/ellipsis";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const Summary = ({ hash }: { hash: Hash }) => {
  const handleCopy = () => {
    copy(hash);

    toast.success("Copied!", {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-auto pl-6 pt-6">
        <h1 className=" font-bold mb-4">Summary</h1>

        <h4 className="text-sm font-semibold leading-6 ">Transaction Hash:</h4>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleCopy}>
          <p className="mt-1 text-xs leading-6 block lg:hidden">
            {ellipsis(hash, 14)}
          </p>

          <p className="mt-1 text-sm leading-6  hidden lg:block">{hash}</p>

          <DocumentDuplicateIcon
            aria-hidden="true"
            className="h-5 w-5 flex-shrink-0 text-rose-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
