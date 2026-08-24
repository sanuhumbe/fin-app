import { create } from "zustand";
import type { Transaction, TransactionFormValues } from "@/lib/schemas";

const seedTransactions: Transaction[] = [
  { id: "1", description: "Salary",              amountCents: 450000,  date: "2026-08-01", category: "income"   },
  { id: "2", description: "Rent",                 amountCents: -180000, date: "2026-08-03", category: "expense"  },
  { id: "3", description: "Groceries",            amountCents: -12450,  date: "2026-08-05", category: "expense"  },
  { id: "4", description: "Freelance project",    amountCents: 75000,   date: "2026-08-10", category: "income"   },
  { id: "5", description: "Transfer to Savings",  amountCents: -50000,  date: "2026-08-12", category: "transfer" },
];

interface TransactionStore {
  transactions: Transaction[];
  // CRUD
  create: (t: TransactionFormValues) => void;
  update: (id: string, t: TransactionFormValues) => void;
  remove: (id: string) => void;
  getById: (id: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: seedTransactions,

  create: (t) =>
    set((state) => ({
      transactions: [{ ...t, id: crypto.randomUUID() }, ...state.transactions],
    })),

  update: (id, t) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...t, id } : tx
      ),
    })),

  remove: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),

  getById: (id) => get().transactions.find((tx) => tx.id === id),
}));
