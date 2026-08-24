"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTransactionStore } from "@/store/transactions";
import { fromCents } from "@/lib/money";

export function BalanceChart() {
  const transactions = useTransactionStore((s) => s.transactions);
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));

  let running = 0;
  const data = sorted.map((t) => {
    running += t.amountCents;
    return { date: t.date, balance: fromCents(running).toNumber() };
  });

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
        <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
