import ucfirst from "@/lib/utils/ucfirst";
import { describe, expect, it } from "@jest/globals";

describe("ucfirst function", () => {
  it("should return an empty string for empty input", () => {
    expect(ucfirst("")).toBe("");
  });

  it("should return an uppercase string for a single character input", () => {
    expect(ucfirst("a")).toBe("A");
    expect(ucfirst("z")).toBe("Z");
  });

  it("should return the input string with the first letter in uppercase for a multi-character input", () => {
    expect(ucfirst("hello")).toBe("Hello");
    expect(ucfirst("world")).toBe("World");
  });

  it("should return the input string with the first letter in uppercase for an input starting with a number", () => {
    expect(ucfirst("123hello")).toBe("123hello");
  });
});
