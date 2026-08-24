import Decimal from "decimal.js";

// Convention: ALL amounts are stored/passed as integer cents.
// Only convert to Decimal at the UI boundary for display or input parsing.
export type Cents = number;

export function fromCents(cents: Cents): Decimal {
  return new Decimal(cents).dividedBy(100);
}

export function toCents(amount: Decimal | number | string): Cents {
  return new Decimal(amount).times(100).round().toNumber();
}

export function formatMoney(cents: Cents, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(fromCents(cents).toNumber());
}
