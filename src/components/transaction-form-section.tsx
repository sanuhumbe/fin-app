"use client";

import { useTransactionStore } from "@/store/transactions";
import { TransactionForm } from "@/components/transaction-form";

export function TransactionFormSection() {
  const create = useTransactionStore((s) => s.create);
  return <TransactionForm onSubmit={(values) => create(values)} />;
}
