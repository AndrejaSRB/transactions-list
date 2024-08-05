import formatTimestamp from "@/lib/utils/formatTimestamp";
import format from "date-fns/format";

jest.mock("date-fns/format", () => jest.fn());

describe("formatTimestamp function", () => {
  const mockFormat = format as jest.MockedFunction<typeof format>;

  beforeEach(() => {
    mockFormat.mockReset();
  });

  it("should format a valid timestamp correctly", () => {
    const timestamp = 1704067200;
    const date = new Date(timestamp * 1000);

    mockFormat.mockReturnValue("1st Jan 2024");

    const result = formatTimestamp(timestamp);

    expect(result).toBe("1st Jan 2024");
    expect(mockFormat).toHaveBeenCalledWith(date, "do MMM yyyy");
  });

  it("should return undefined when timestamp is undefined", () => {
    const result = formatTimestamp(undefined);
    expect(result).toBeUndefined();
    expect(mockFormat).not.toHaveBeenCalled();
  });

  it("should correctly handle a timestamp representing the current time", () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timestamp = currentTime;
    const date = new Date(timestamp * 1000);

    const formattedDate = "5th Aug 2024";

    mockFormat.mockReturnValue(formattedDate);

    const result = formatTimestamp(timestamp);

    expect(result).toBe(formattedDate);
    expect(mockFormat).toHaveBeenCalledWith(date, "do MMM yyyy");
  });
});
