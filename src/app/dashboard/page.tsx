"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { TransactionChart } from "@/components/dashboard/transaction-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ProjectOverview } from "@/components/dashboard/project-overview"
import { PlaidLinkButton } from "@/components/plaid/plaid-link-button"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function DashboardPage() {
  const handleAccountConnected = () => {
    // Refresh data after account connection
    window.location.reload()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your construction business finances
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Icons.download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <PlaidLinkButton onSuccess={handleAccountConnected} />
          </div>
        </div>

        {/* Metrics Cards */}
        <MetricsCards />

        {/* Charts and Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <TransactionChart className="col-span-4" />
          <ProjectOverview className="col-span-3" />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </DashboardLayout>
  )
}