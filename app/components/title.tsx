"use client";

import { chains } from "@/lib/chains/chains"; // Adjust the import path as needed

const Title = () => {
  // Create a list of chain names
  const chainNames = chains.map((chain) => chain.name);

  // Determine the formatted string based on the number of chains
  let formattedChainNames: string;

  if (chainNames.length === 1) {
    formattedChainNames = chainNames[0];
  } else if (chainNames.length === 2) {
    formattedChainNames = chainNames.join(" and ");
  } else {
    const lastChain = chainNames.pop();
    formattedChainNames = `${chainNames.join(", ")} and ${lastChain}`;
  }

  return (
    <div>
      <h4 className="text-sm lg:text-lg">
        Supported chains are {formattedChainNames}.
      </h4>
    </div>
  );
};

export default Title;
