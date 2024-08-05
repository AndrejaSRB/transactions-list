import { getTokenName } from "@/lib/utils/getTokenName";
import { chains } from "@/lib/chains/chains";

describe("getTokenName", () => {
  it("should return the correct token name for a valid chainId", () => {
    const ethChainId = chains.find(
      (chain) => chain.name.toLowerCase() === "ethereum"
    )?.chainId;
    const polygonChainId = chains.find(
      (chain) => chain.name.toLowerCase() === "polygon"
    )?.chainId;

    if (ethChainId) {
      expect(getTokenName(ethChainId)).toBe("ETH");
    }

    if (polygonChainId) {
      expect(getTokenName(polygonChainId)).toBe("MATIC");
    }
  });

  it("should return undefined for an invalid chainId", () => {
    expect(getTokenName(999999)).toBeUndefined();
  });
});
