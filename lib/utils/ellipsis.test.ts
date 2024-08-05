import ellipsis from "@/lib/utils/ellipsis";
import { describe, expect, it } from "@jest/globals";

const EXAMPLE_HASH = "0xAd36FA05C9BD878fb3b7C8032251A609cfe3b4e6";

describe("ellipsis function", () => {
  it("should return the first and last `length` characters of a hex string separated by '...'", () => {
    const hex = EXAMPLE_HASH;
    const result = ellipsis(hex);

    expect(result).toBe("0xAd3...4e6");
  });

  it("should return the entire hex string if it is less than `length * 2 + 3` characters long", () => {
    const hex = "0xabcd";
    const result = ellipsis(hex);

    expect(result).toBe(hex);
  });

  it("should allow the `length` argument to be customized", () => {
    const hex = EXAMPLE_HASH;
    const result = ellipsis(hex, 6);

    expect(result).toBe("0xAd36FA...e3b4e6");
  });

  it("should return `undefined` if the input is not a string", () => {
    const result = ellipsis(123 as any);

    expect(result).toBe(undefined);
  });
});
