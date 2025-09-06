"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"

export function MetricsCards() {
  const metrics = [
    {
      title: "Total Expenses",
      value: "$45,231.89",
      change: "+20.1% from last month",
      trend: "up" as const,
      icon: Icons.dollar,
    },
    {
      title: "Pending Transactions",
      value: "23",
      change: "5 need approval",
      trend: "neutral" as const,
      icon: Icons.alert,
    },
    {
      title: "Active Projects",
      value: "8",
      change: "2 completing this month",
      trend: "up" as const,
      icon: Icons.building,
    },
    {
      title: "Connected Accounts",
      value: "4",
      change: "All accounts synced",
      trend: "up" as const,
      icon: Icons.card,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-1">
                <p className="text-xs text-muted-foreground">
                  {metric.change}
                </p>
                {metric.trend === "up" && (
                  <Icons.trendingUp className="h-3 w-3 text-green-500" />
                )}
                {metric.trend === "down" && (
                  <Icons.trendingDown className="h-3 w-3 text-red-500" />
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}