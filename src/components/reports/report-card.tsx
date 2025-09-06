"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import type { Icon } from "@/components/ui/icons"

interface ReportCardProps {
  title: string
  description: string
  lastGenerated: string
  icon: Icon
  onExport: () => void
}

export function ReportCard({ 
  title, 
  description, 
  lastGenerated, 
  icon: IconComponent, 
  onExport 
}: ReportCardProps) {
  const isRecent = new Date(lastGenerated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last generated:</span>
          <div className="flex items-center space-x-2">
            <span>{new Date(lastGenerated).toLocaleDateString()}</span>
            {isRecent && (
              <Badge variant="secondary" className="text-xs">
                Recent
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button onClick={onExport} variant="outline" size="sm" className="w-full">
          <Icons.download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  )
}