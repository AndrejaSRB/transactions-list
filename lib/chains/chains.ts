// We are collecting all supported chains here, and exporting them
// so that they can be used in other files

import Chain from "@/lib/types/Chain";

export const chains: Chain[] = [
  {
    name: "Etherium",
    chainId: 1,
    url: "etherscan.io",
    token: "ETH",
  },
  {
    name: "Polygon",
    chainId: 137,
    url: "polygonscan.com",
    token: "MATIC",
  },
  // Add more chains here
];
