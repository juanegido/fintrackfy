"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { TransactionEditModal } from "./transaction-edit-modal"

interface Transaction {
  id: string
  date: string
  name: string
  amount: number
  category: string | null
  project: string | null
  status: "approved" | "pending" | "rejected"
  account: string
  isAiCategorized: boolean
}

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    name: "Home Depot #4532",
    amount: -1249.99,
    category: "Materials",
    project: "Kitchen Remodel",
    status: "approved",
    account: "Business Checking",
    isAiCategorized: true,
  },
  {
    id: "2",
    date: "2024-01-14",
    name: "ABC Plumbing Services",
    amount: -3500.00,
    category: "Subcontractor",
    project: "Bathroom Addition",
    status: "pending",
    account: "Business Checking",
    isAiCategorized: true,
  },
  {
    id: "3",
    date: "2024-01-14",
    name: "Sherwin-Williams Paint",
    amount: -485.50,
    category: "Materials",
    project: "Kitchen Remodel",
    status: "approved",
    account: "Business Credit Card",
    isAiCategorized: false,
  },
  {
    id: "4",
    date: "2024-01-13",
    name: "United Rentals",
    amount: -750.00,
    category: "Equipment",
    project: "Deck Installation",
    status: "pending",
    account: "Business Checking",
    isAiCategorized: true,
  },
  {
    id: "5",
    date: "2024-01-12",
    name: "Client Payment - Johnson",
    amount: 15000.00,
    category: "Income",
    project: "Kitchen Remodel",
    status: "approved",
    account: "Business Checking",
    isAiCategorized: false,
  },
]

export function TransactionTable() {
  const [transactions] = useState<Transaction[]>(sampleTransactions)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(transactions.map(t => t.id))
    } else {
      setSelectedTransactions([])
    }
  }

  const handleSelectTransaction = (transactionId: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, transactionId])
    } else {
      setSelectedTransactions(selectedTransactions.filter(id => id !== transactionId))
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedTransactions.length === transactions.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTransactions.includes(transaction.id)}
                    onCheckedChange={(checked) => 
                      handleSelectTransaction(transaction.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{transaction.name}</span>
                    {transaction.isAiCategorized && (
                      <Icons.check className="h-3 w-3 text-blue-500" title="AI Categorized" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  {transaction.category ? (
                    <Badge variant="outline">{transaction.category}</Badge>
                  ) : (
                    <span className="text-muted-foreground">Uncategorized</span>
                  )}
                </TableCell>
                <TableCell>
                  {transaction.project ? (
                    <Badge variant="secondary">{transaction.project}</Badge>
                  ) : (
                    <span className="text-muted-foreground">No project</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {transaction.account}
                </TableCell>
                <TableCell>
                  {getStatusBadge(transaction.status)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.menu className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setEditingTransaction(transaction)}>
                        <Icons.edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Icons.check className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.x className="mr-2 h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <TransactionEditModal
          transaction={editingTransaction}
          open={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSave={() => setEditingTransaction(null)}
        />
      )}
    </>
  )
}