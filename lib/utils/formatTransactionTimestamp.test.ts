import formatTransactionTimestamp from "@/lib/utils/formatTransactionTimestamp";
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";

jest.mock("date-fns/format", () => jest.fn());
jest.mock("date-fns/formatDistanceStrict", () => jest.fn());

describe("formatTransactionTimestamp function", () => {
  const mockFormat = format as jest.MockedFunction<typeof format>;
  const mockFormatDistanceStrict = formatDistanceStrict as jest.MockedFunction<
    typeof formatDistanceStrict
  >;

  beforeEach(() => {
    mockFormat.mockReset();
    mockFormatDistanceStrict.mockReset();
  });

  it("should return undefined when timestamp is undefined", () => {
    const result = formatTransactionTimestamp(undefined);
    expect(result).toBeUndefined();
    expect(mockFormat).not.toHaveBeenCalled();
    expect(mockFormatDistanceStrict).not.toHaveBeenCalled();
  });

  it("should format timestamp correctly", () => {
    const timestamp = BigInt(1704067200);
    const date = new Date(Number(timestamp) * 1000);

    mockFormat.mockReturnValue("1st Jan 2024 - 12:00:00 AM");
    mockFormatDistanceStrict.mockReturnValue("1 day");

    const result = formatTransactionTimestamp(timestamp);

    expect(result).toBe("1 day ago (1st Jan 2024 - 12:00:00 AM)");
    expect(mockFormatDistanceStrict).toHaveBeenCalledWith(new Date(), date);
    expect(mockFormat).toHaveBeenCalledWith(date, "do MMM yyyy - HH:mm:ss aaa");
  });

  it("should correctly handle a timestamp representing the current time", () => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timestamp = BigInt(currentTime);
    const date = new Date(currentTime * 1000);

    mockFormat.mockReturnValue("1st Jan 2023 - 12:00:00 AM");
    mockFormatDistanceStrict.mockReturnValue("0 seconds");

    const result = formatTransactionTimestamp(timestamp);

    expect(result).toBe("0 seconds ago (1st Jan 2023 - 12:00:00 AM)");
    expect(mockFormatDistanceStrict).toHaveBeenCalledWith(new Date(), date);
    expect(mockFormat).toHaveBeenCalledWith(date, "do MMM yyyy - HH:mm:ss aaa");
  });
});
