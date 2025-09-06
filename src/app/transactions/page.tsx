"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">
              Manage and categorize your financial transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Icons.download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Icons.upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        {/* Filters */}
        <TransactionFilters />

        {/* Transaction Table */}
        <TransactionTable />
      </div>
    </DashboardLayout>
  )
}