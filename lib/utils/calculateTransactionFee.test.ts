import calculateTransactionFee from "./calculateTransactionFee";
import formatBN from "./formatBN";

// Mock the formatBN function
jest.mock("./formatBN", () => jest.fn());

describe("calculateTransactionFee function", () => {
  const mockFormatBN = formatBN as jest.MockedFunction<typeof formatBN>;

  beforeEach(() => {
    mockFormatBN.mockReset();
  });

  it("should return 0 when gasUsed is undefined", () => {
    mockFormatBN.mockImplementation(() => "mockedResult");

    const result = calculateTransactionFee(undefined, BigInt(100));
    expect(result).toBe(0);
    expect(mockFormatBN).not.toHaveBeenCalled();
  });

  it("should return 0 when gasPrice is undefined", () => {
    mockFormatBN.mockImplementation(() => "mockedResult");

    const result = calculateTransactionFee(BigInt(1000), undefined);
    expect(result).toBe(0);
    expect(mockFormatBN).not.toHaveBeenCalled();
  });

  it("should format the result using formatBN method with correct parameters when both gasUsed and gasPrice are provided", () => {
    mockFormatBN.mockImplementation(() => "formattedResult");

    const gasUsed = BigInt(1000);
    const gasPrice = BigInt(200);
    const expectedFee = gasPrice * gasUsed;

    const result = calculateTransactionFee(gasUsed, gasPrice);
    expect(result).toBe("formattedResult");
    expect(mockFormatBN).toHaveBeenCalledWith(expectedFee, 18, 15);
  });
});
