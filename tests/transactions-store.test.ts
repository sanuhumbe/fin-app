import { describe, it, expect, beforeEach } from "vitest";
import { useTransactionStore } from "@/store/transactions";

describe("transactions store CRUD", () => {
  beforeEach(() => {
    useTransactionStore.setState({ transactions: [] });
  });

  it("creates a transaction", () => {
    useTransactionStore.getState().create({
      description: "Coffee",
      amountCents: -500,
      date: "2026-08-20",
      category: "expense",
    });
    expect(useTransactionStore.getState().transactions).toHaveLength(1);
  });

  it("updates a transaction", () => {
    useTransactionStore.getState().create({
      description: "Coffee",
      amountCents: -500,
      date: "2026-08-20",
      category: "expense",
    });
    const id = useTransactionStore.getState().transactions[0]!.id;
    useTransactionStore.getState().update(id, {
      description: "Latte",
      amountCents: -600,
      date: "2026-08-20",
      category: "expense",
    });
    expect(useTransactionStore.getState().transactions[0]!.description).toBe("Latte");
  });

  it("deletes a transaction", () => {
    useTransactionStore.getState().create({
      description: "Coffee",
      amountCents: -500,
      date: "2026-08-20",
      category: "expense",
    });
    const id = useTransactionStore.getState().transactions[0]!.id;
    useTransactionStore.getState().remove(id);
    expect(useTransactionStore.getState().transactions).toHaveLength(0);
  });
});
