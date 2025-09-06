"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

interface AccountCardProps {
  account: BankAccount
  onSync: () => void
}

export function AccountCard({ account, onSync }: AccountCardProps) {
  const getAccountIcon = (type: string, subtype: string) => {
    if (type === "credit") return Icons.card
    if (subtype === "checking") return Icons.wallet
    if (subtype === "savings") return Icons.piggyBank
    return Icons.card
  }

  const getBalanceColor = (balance: number, type: string) => {
    if (type === "credit") {
      return balance < 0 ? "text-red-600" : "text-green-600"
    }
    return balance > 0 ? "text-green-600" : "text-red-600"
  }

  const formatBalance = (balance: number, type: string) => {
    if (type === "credit" && balance < 0) {
      return `$${Math.abs(balance).toLocaleString()}`
    }
    return `${balance >= 0 ? '+' : '-'}$${Math.abs(balance).toLocaleString()}`
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default">Active</Badge>
    ) : (
      <Badge variant="destructive">Inactive</Badge>
    )
  }

  const AccountIcon = getAccountIcon(account.type, account.subtype)
  const lastSyncedDate = new Date(account.lastSynced)
  const isRecentSync = Date.now() - lastSyncedDate.getTime() < 60 * 60 * 1000 // 1 hour

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AccountIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{account.name}</CardTitle>
              <CardDescription className="capitalize">
                {account.subtype} • ****{account.mask}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onSync}>
                <Icons.upload className="mr-2 h-4 w-4" />
                Sync Transactions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.eye className="mr-2 h-4 w-4" />
                View Transactions
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Icons.trash className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Institution */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Institution</span>
          <span className="text-sm font-medium">{account.institution}</span>
        </div>

        {/* Balance */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {account.type === "credit" ? "Available Credit" : "Current Balance"}
          </span>
          <span className={`text-lg font-bold ${getBalanceColor(account.balance, account.type)}`}>
            {formatBalance(account.balance, account.type)}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          {getStatusBadge(account.isActive)}
        </div>

        {/* Last Synced */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Synced</span>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-foreground">
              {lastSyncedDate.toLocaleDateString()} at {lastSyncedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isRecentSync && (
              <Icons.check className="h-3 w-3 text-green-500" />
            )}
          </div>
        </div>

        {/* Sync Button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSync}
          className="w-full mt-4"
        >
          <Icons.upload className="mr-2 h-4 w-4" />
          Sync Now
        </Button>
      </CardContent>
    </Card>
  )
}