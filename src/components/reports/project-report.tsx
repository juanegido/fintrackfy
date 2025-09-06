"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

const projectData = [
  {
    name: "Kitchen Remodel",
    budget: 25000,
    spent: 21250,
    remaining: 3750,
    progress: 85,
    status: "active",
    client: "Johnson Family",
  },
  {
    name: "Bathroom Addition",
    budget: 18000,
    spent: 11160,
    remaining: 6840,
    progress: 62,
    status: "active",
    client: "Smith Residence",
  },
  {
    name: "Deck Installation",
    budget: 12000,
    spent: 3600,
    remaining: 8400,
    progress: 30,
    status: "active",
    client: "Davis Home",
  },
  {
    name: "Garage Conversion",
    budget: 35000,
    spent: 35000,
    remaining: 0,
    progress: 100,
    status: "completed",
    client: "Wilson Property",
  },
]

export function ProjectReport() {
  const totalBudget = projectData.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projectData.reduce((sum, project) => sum + project.spent, 0)
  const activeProjects = projectData.filter(p => p.status === "active").length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
            <CardTitle className="text-2xl">${totalBudget.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-2xl">${totalSpent.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Projects</CardDescription>
            <CardTitle className="text-2xl">{activeProjects}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Budget Utilization</CardDescription>
            <CardTitle className="text-2xl">{((totalSpent / totalBudget) * 100).toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Budget vs Spent Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>Comparison of budgeted amounts vs actual spending by project</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`, 
                  name === "budget" ? "Budget" : "Spent"
                ]}
              />
              <Bar dataKey="budget" fill="#e2e8f0" name="budget" />
              <Bar dataKey="spent" fill="#3b82f6" name="spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Financial Details</CardTitle>
          <CardDescription>Detailed financial breakdown for each project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.map((project, index) => {
              const budgetUtilization = (project.spent / project.budget) * 100
              const isOverBudget = budgetUtilization > 100
              const isNearBudget = budgetUtilization > 90

              return (
                <div key={project.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={project.status === "active" ? "default" : "secondary"}
                      >
                        {project.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Icons.fileText className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-medium">${project.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Spent</p>
                      <p className="font-medium">${project.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className={`font-medium ${project.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${project.remaining.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="font-medium">{project.progress}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Budget utilization:</span>
                      <span className={`font-medium ${
                        isOverBudget ? 'text-red-600' : isNearBudget ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {budgetUtilization.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Math.min(budgetUtilization, 100)} />
                    {isOverBudget && (
                      <div className="flex items-center space-x-1 text-xs text-red-600">
                        <Icons.alert className="h-3 w-3" />
                        <span>Over budget by ${(-project.remaining).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}