"use client";
import { useAddressInput } from "@/hooks/useAddressInput";
import React from "react";

const AddressSearch = () => {
  const { address, isValid, error, handleChange, handleSubmit } =
    useAddressInput();

  return (
    <div className="mt-8 flex flex-col items-center">
      <input
        type="text"
        value={address}
        onChange={handleChange}
        placeholder="Enter wallet address"
        className={`bg-slate-900 px-4 lg:px-6 py-2 lg:py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg w-80 lg:w-[500px] mb-2 focus:border-rose-900/20`}
      />
      {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg w-32 lg:w-44 mt-4 ${
          isValid
            ? "bg-rose-500 text-white transition-colors hover:bg-rose-600"
            : "bg-rose-900/50 text-gray-500 cursor-not-allowed"
        }`}>
        Search
      </button>
    </div>
  );
};

export default AddressSearch;
