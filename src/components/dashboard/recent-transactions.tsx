"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"

const recentTransactions = [
  {
    id: "1",
    name: "Home Depot #4532",
    amount: -1249.99,
    date: "2024-01-15",
    category: "Materials",
    project: "Kitchen Remodel",
    status: "approved",
  },
  {
    id: "2", 
    name: "ABC Plumbing Services",
    amount: -3500.00,
    date: "2024-01-14",
    category: "Subcontractor",
    project: "Bathroom Addition",
    status: "pending",
  },
  {
    id: "3",
    name: "Sherwin-Williams Paint",
    amount: -485.50,
    date: "2024-01-14",
    category: "Materials",
    project: "Kitchen Remodel",
    status: "approved",
  },
  {
    id: "4",
    name: "United Rentals",
    amount: -750.00,
    date: "2024-01-13",
    category: "Equipment",
    project: "Deck Installation",
    status: "pending",
  },
  {
    id: "5",
    name: "Client Payment - Johnson",
    amount: 15000.00,
    date: "2024-01-12",
    category: "Income",
    project: "Kitchen Remodel",
    status: "approved",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest financial activity across all projects
            </CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href="/transactions">
              View All
              <Icons.chevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {transaction.amount > 0 ? (
                      <Icons.trendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <Icons.trendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      {transaction.project}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className={`text-sm font-medium ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <Badge 
                    variant={transaction.status === "approved" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}