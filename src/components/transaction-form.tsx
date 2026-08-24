"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionFormSchema, type TransactionFormValues, type Transaction } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  defaultValues?: Transaction;         // present -> edit mode
  onSubmit: (values: TransactionFormValues) => void;
  onCancel?: () => void;
}

export function TransactionForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues ?? {
      description: "",
      amountCents: 0,
      date: new Date().toISOString().slice(0, 10),
      category: "expense",
    },
  });

  const submit = (values: TransactionFormValues) => {
    onSubmit(values);
    if (!defaultValues) reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
      <div className="sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register("description")} />
        {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="amountCents">Amount (cents)</Label>
        <Input id="amountCents" type="number" {...register("amountCents", { valueAsNumber: true })} />
        {errors.amountCents && <p className="text-xs text-destructive mt-1">{errors.amountCents.message}</p>}
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date")} />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          {...register("category")}
          className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      <div className="sm:col-span-5 flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {defaultValues ? "Save changes" : "Add transaction"}
        </Button>
      </div>
    </form>
  );
}
