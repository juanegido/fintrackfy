"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const monthlyData = [
  { month: "Oct", materials: 8400, labor: 3200, equipment: 1200, other: 800 },
  { month: "Nov", materials: 9600, labor: 4100, equipment: 900, other: 1100 },
  { month: "Dec", materials: 12100, labor: 5200, equipment: 1600, other: 1300 },
  { month: "Jan", materials: 14500, labor: 6200, equipment: 1600, other: 1500 },
]

const categoryData = [
  { name: "Materials", value: 44600, color: "#8884d8" },
  { name: "Labor", value: 18700, color: "#82ca9d" },
  { name: "Equipment", value: 5300, color: "#ffc658" },
  { name: "Other", value: 4700, color: "#ff7c7c" },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"]

export function ExpenseReport() {
  const totalExpenses = categoryData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses (4 months)</CardDescription>
            <CardTitle className="text-2xl">${totalExpenses.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Monthly</CardDescription>
            <CardTitle className="text-2xl">${(totalExpenses / 4).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Largest Category</CardDescription>
            <CardTitle className="text-2xl">Materials</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-2xl text-green-600">+12.3%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Breakdown</CardTitle>
            <CardDescription>Expenses by category over the last 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  labelStyle={{ color: "#000" }}
                />
                <Bar dataKey="materials" stackId="a" fill="#8884d8" />
                <Bar dataKey="labor" stackId="a" fill="#82ca9d" />
                <Bar dataKey="equipment" stackId="a" fill="#ffc658" />
                <Bar dataKey="other" stackId="a" fill="#ff7c7c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Total expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Detailed breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">${category.value.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {((category.value / totalExpenses) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}