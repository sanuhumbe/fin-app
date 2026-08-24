"use client";

import { useTransactionStore } from "@/store/transactions";
import { formatMoney } from "@/lib/money";
import { Card, CardContent } from "@/components/ui/card";

export function SummaryCards() {
  const transactions = useTransactionStore((s) => s.transactions);
  const balance = transactions.reduce((sum, t) => sum + t.amountCents, 0);
  const income = transactions.filter((t) => t.amountCents > 0).reduce((s, t) => s + t.amountCents, 0);
  const expenses = transactions.filter((t) => t.amountCents < 0).reduce((s, t) => s + t.amountCents, 0);

  const items = [
    { label: "Balance", value: balance, color: "text-foreground" },
    { label: "Income", value: income, color: "text-emerald-600" },
    { label: "Expenses", value: expenses, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={`text-lg font-semibold ${item.color}`}>{formatMoney(Math.abs(item.value))}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
