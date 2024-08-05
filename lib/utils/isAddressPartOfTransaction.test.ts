import isAddressPartOfTransaction from "@/lib/utils/isAddressPartOfTransaction";
import Hash from "@/lib/types/Hash";

const mockedHash = "0x123aB91Bc";
describe("isAddressPartOfTransaction function", () => {
  it("should return true if requestedAddress matches from address", () => {
    const requestedAddress = mockedHash;
    const from = mockedHash;
    const to = "0x456";
    expect(isAddressPartOfTransaction(requestedAddress, from, to)).toBe(true);
  });

  it("should return true if requestedAddress matches to address", () => {
    const requestedAddress = mockedHash;
    const from = "0x785";
    const to = mockedHash;
    expect(isAddressPartOfTransaction(requestedAddress, from, to)).toBe(true);
  });

  it("should return false if requestedAddress does not match either address", () => {
    const requestedAddress = mockedHash;
    const from = "0xa896";
    const to = "0x456";
    expect(isAddressPartOfTransaction(requestedAddress, from, to)).toBe(false);
  });

  it("should return false if requestedAddress is falsy", () => {
    const requestedAddress = "";
    const from = "0x123";
    const to = "0x456";
    expect(isAddressPartOfTransaction(requestedAddress, from, to)).toBe(false);
  });

  it("should handle case insensitivity", () => {
    const requestedAddress = mockedHash.toLowerCase() as Hash;
    const from = mockedHash.toUpperCase() as Hash;
    const to = "0x456";
    expect(isAddressPartOfTransaction(requestedAddress, from, to)).toBe(true);
  });
});
