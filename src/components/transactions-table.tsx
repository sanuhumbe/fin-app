"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useTransactionStore } from "@/store/transactions";
import { formatMoney } from "@/lib/money";
import type { Transaction } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transaction-form";

const columnHelper = createColumnHelper<Transaction>();

export function TransactionsTable() {
  const transactions = useTransactionStore((s) => s.transactions);
  const update = useTransactionStore((s) => s.update);
  const remove = useTransactionStore((s) => s.remove);

  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const columns = [
    columnHelper.accessor("date", { header: "Date" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => (
        <span className="capitalize text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("amountCents", {
      header: "Amount",
      cell: (info) => {
        const cents = info.getValue();
        return (
          <span className={cents < 0 ? "text-red-600" : "text-emerald-600"}>
            {cents < 0 ? "-" : "+"}
            {formatMoney(Math.abs(cents))}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => {
        const tx = info.row.original;
        return (
          <div className="flex gap-1 justify-end">
            <Button size="sm" variant="ghost" onClick={() => setEditingId(tx.id)} aria-label="Edit">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => remove(tx.id)} aria-label="Delete">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-border text-left text-muted-foreground">
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="py-2 cursor-pointer select-none"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {{ asc: " ↑", desc: " ↓" }[h.column.getIsSorted() as string] ?? ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const tx = row.original;
            if (editingId === tx.id) {
              return (
                <tr key={row.id} className="border-b border-border bg-muted/40">
                  <td colSpan={columns.length} className="py-3">
                    <TransactionForm
                      defaultValues={tx}
                      onCancel={() => setEditingId(null)}
                      onSubmit={(values) => {
                        update(tx.id, values);
                        setEditingId(null);
                      }}
                    />
                  </td>
                </tr>
              );
            }
            return (
              <tr key={row.id} className="border-b border-border">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-muted-foreground">
                No transactions yet. Add one above.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
