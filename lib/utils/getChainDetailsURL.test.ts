import { getChainDetailsURL } from "@/lib/utils/getChainDetailsURL";
import { chains } from "@/lib/chains/chains";

describe("getChainDetailsURL function", () => {
  it("should return the correct URL for a valid chainId", () => {
    const ethChain = chains.find(
      (chain) => chain.name?.toLowerCase() === "ethereum"
    );
    const polygonChain = chains.find(
      (chain) => chain.name?.toLowerCase() === "polygon"
    );

    if (ethChain) {
      expect(getChainDetailsURL(ethChain.chainId)).toBe(
        `https://${ethChain.url}/tx`
      );
    }

    if (polygonChain) {
      expect(getChainDetailsURL(polygonChain.chainId)).toBe(
        `https://${polygonChain.url}/tx`
      );
    }
  });

  it("should return '#' for undefined chainId", () => {
    expect(getChainDetailsURL(undefined)).toBe("#");
  });
});
