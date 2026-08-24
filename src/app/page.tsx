import { TransactionsTable } from "@/components/transactions-table";
import { TransactionFormSection } from "@/components/transaction-form-section";
import { BalanceChart } from "@/components/balance-chart";
import { SummaryCards } from "@/components/summary-cards";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Dummy data · client-side CRUD via Zustand</p>
      </div>

      <SummaryCards />

      <Card>
        <CardHeader>
          <CardTitle>Balance over time</CardTitle>
        </CardHeader>
        <CardContent>
          <BalanceChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionFormSection />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </main>
  );
}
