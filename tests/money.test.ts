import { describe, it, expect } from "vitest";
import { fromCents, toCents, formatMoney } from "@/lib/money";

describe("money utils", () => {
  it("converts cents to a Decimal correctly", () => {
    expect(fromCents(450000).toString()).toBe("4500");
  });

  it("converts a decimal amount back to integer cents", () => {
    expect(toCents(45.5)).toBe(4550);
  });

  it("formats cents as currency", () => {
    expect(formatMoney(450000)).toBe("$4,500.00");
  });

  it("never loses precision on typical float-unsafe values", () => {
    // 0.1 + 0.2 !== 0.3 in raw JS floats; this must still resolve exactly
    expect(toCents(0.1) + toCents(0.2)).toBe(30);
  });
});
