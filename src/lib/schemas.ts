import { z } from "zod";

export const categorySchema = z.enum(["income", "expense", "transfer"]);

export const transactionSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  amountCents: z.number().int("Must be a whole number of cents"),
  date: z.string().min(1, "Date is required"),
  category: categorySchema,
});

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionFormSchema = transactionSchema.omit({ id: true });
export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
