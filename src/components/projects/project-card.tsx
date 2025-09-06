"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"

interface Project {
  id: string
  name: string
  description: string
  budget: number
  spent: number
  progress: number
  status: "active" | "completed" | "on_hold"
  client: string
  startDate: string
  endDate?: string
  address: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "on_hold":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "on_hold":
        return <Badge variant="destructive">On Hold</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const budgetUtilization = (project.spent / project.budget) * 100
  const isOverBudget = budgetUtilization > 100
  const isNearBudget = budgetUtilization > 90

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}`}>
                  <Icons.eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.fileText className="mr-2 h-4 w-4" />
                Generate Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Client & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icons.user className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.client}</span>
          </div>
          {getStatusBadge(project.status)}
        </div>

        {/* Address */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icons.home className="h-4 w-4" />
          <span className="line-clamp-1">{project.address}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : isNearBudget ? 'text-yellow-600' : 'text-green-600'}`}>
              ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
            </span>
          </div>
          <Progress 
            value={Math.min(budgetUtilization, 100)} 
            className="h-2"
          />
          {isOverBudget && (
            <div className="flex items-center space-x-1 text-xs text-red-600">
              <Icons.alert className="h-3 w-3" />
              <span>Over budget by ${(project.spent - project.budget).toLocaleString()}</span>
            </div>
          )}
          {isNearBudget && !isOverBudget && (
            <div className="flex items-center space-x-1 text-xs text-yellow-600">
              <Icons.alert className="h-3 w-3" />
              <span>Approaching budget limit</span>
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icons.calendar className="h-3 w-3" />
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          {project.endDate && (
            <div className="flex items-center space-x-1">
              <Icons.calendar className="h-3 w-3" />
              <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/projects/${project.id}`}>
            View Details
            <Icons.chevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}