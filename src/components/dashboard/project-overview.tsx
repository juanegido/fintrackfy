"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"

interface ProjectOverviewProps {
  className?: string
}

const projects = [
  {
    id: "1",
    name: "Kitchen Remodel",
    budget: 25000,
    spent: 21250,
    progress: 85,
    status: "active",
    client: "Johnson Family",
  },
  {
    id: "2",
    name: "Bathroom Addition", 
    budget: 18000,
    spent: 11160,
    progress: 62,
    status: "active",
    client: "Smith Residence",
  },
  {
    id: "3",
    name: "Deck Installation",
    budget: 12000,
    spent: 3600,
    progress: 30,
    status: "active",
    client: "Davis Home",
  },
  {
    id: "4",
    name: "Garage Conversion",
    budget: 35000,
    spent: 35000,
    progress: 100,
    status: "completed",
    client: "Wilson Property",
  },
]

export function ProjectOverview({ className }: ProjectOverviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              Overview of current construction projects
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">
              View All
              <Icons.chevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.client}</p>
              </div>
              <Badge 
                variant={project.status === "completed" ? "default" : "secondary"}
                className="text-xs"
              >
                {project.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Progress value={project.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  {project.progress}%
                </span>
              </div>
            </div>
            
            {project.progress > 90 && project.status === "active" && (
              <div className="flex items-center space-x-1 text-xs text-amber-600">
                <Icons.alert className="h-3 w-3" />
                <span>Near budget limit</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}