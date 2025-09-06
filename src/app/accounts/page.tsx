"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AccountCard } from "@/components/accounts/account-card"
import { PlaidLinkButton } from "@/components/plaid/plaid-link-button"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface BankAccount {
  id: string
  name: string
  type: string
  subtype: string
  mask: string
  balance: number
  isActive: boolean
  lastSynced: string
  institution: string
}

const sampleAccounts: BankAccount[] = [
  {
    id: "1",
    name: "Business Checking",
    type: "depository",
    subtype: "checking",
    mask: "1234",
    balance: 25478.32,
    isActive: true,
    lastSynced: "2024-01-15T10:30:00Z",
    institution: "Chase Bank"
  },
  {
    id: "2", 
    name: "Business Credit Card",
    type: "credit",
    subtype: "credit card",
    mask: "5678",
    balance: -3247.86,
    isActive: true,
    lastSynced: "2024-01-15T10:28:00Z",
    institution: "American Express"
  },
  {
    id: "3",
    name: "Business Savings", 
    type: "depository",
    subtype: "savings",
    mask: "9012",
    balance: 45890.12,
    isActive: true,
    lastSynced: "2024-01-15T10:25:00Z",
    institution: "Chase Bank"
  }
]

export default function AccountsPage() {
  const handleAccountConnected = () => {
    // Refresh accounts list
    window.location.reload()
  }

  const handleSyncAccount = (accountId: string) => {
    // In a real app, this would trigger a sync
    console.log("Syncing account:", accountId)
  }

  const totalBalance = sampleAccounts
    .filter(account => account.type === "depository")
    .reduce((sum, account) => sum + account.balance, 0)

  const totalCredit = sampleAccounts
    .filter(account => account.type === "credit")
    .reduce((sum, account) => sum + Math.abs(account.balance), 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bank Accounts</h1>
            <p className="text-muted-foreground">
              Manage your connected bank accounts and monitor balances
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Icons.upload className="mr-2 h-4 w-4" />
              Sync All
            </Button>
            <PlaidLinkButton onSuccess={handleAccountConnected} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalBalance.toLocaleString()}
                </p>
              </div>
              <Icons.piggyBank className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credit Used</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalCredit.toLocaleString()}
                </p>
              </div>
              <Icons.card className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected Accounts</p>
                <p className="text-2xl font-bold">
                  {sampleAccounts.filter(a => a.isActive).length}
                </p>
              </div>
              <Icons.wallet className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Accounts Grid */}
        {sampleAccounts.length === 0 ? (
          <div className="text-center py-12">
            <Icons.card className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No accounts connected</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your bank accounts to start tracking transactions.
            </p>
            <div className="mt-6">
              <PlaidLinkButton onSuccess={handleAccountConnected} />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onSync={() => handleSyncAccount(account.id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}