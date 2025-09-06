"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/ui/icons"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.home,
    current: false,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: Icons.receipt,
    current: false,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Icons.building,
    current: false,
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: Icons.card,
    current: false,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: Icons.chart,
    current: false,
  },
]

export function Sidebar({ className, onClose, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 w-64", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Quick Stats
          </h2>
          <div className="space-y-2">
            <div className="px-4 py-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <Badge variant="secondary">$12,450</Badge>
              </div>
            </div>
            <div className="px-4 py-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <Badge variant="destructive">23</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Recent Projects
          </h2>
          <ScrollArea className="h-32">
            <div className="space-y-1 px-4">
              <div className="text-sm">
                <div className="font-medium">Kitchen Remodel</div>
                <div className="text-muted-foreground text-xs">85% complete</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Bathroom Addition</div>
                <div className="text-muted-foreground text-xs">62% complete</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Deck Installation</div>
                <div className="text-muted-foreground text-xs">30% complete</div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}