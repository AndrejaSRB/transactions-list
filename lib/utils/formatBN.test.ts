import { parseEther } from "viem";
import formatBN from "@/lib/utils/formatBN";

describe("formatBN function", () => {
  it("should format a bigint value to a string with the given number of decimals", () => {
    const value = parseEther("1.23456789");
    const expected = "1.234";
    const result = formatBN(value, 18, 3);
    expect(result).toEqual(expected);
  });

  it("should remove trailing zeros from the decimal part", () => {
    const value = parseEther("1.200");
    const expected = "1.2";
    const result = formatBN(value, 18, 3);
    expect(result).toEqual(expected);
  });

  it("should remove the trailing dot if there are no decimals", () => {
    const value = parseEther("1");
    const expected = "1";
    const result = formatBN(value, 18, 3);
    expect(result).toEqual(expected);
  });

  it("should return `undefined` if the value is `undefined` or `null`", () => {
    const result = formatBN(undefined);
    expect(result).toBeUndefined();

    const result2 = formatBN(null);
    expect(result2).toBeUndefined();
  });
});
