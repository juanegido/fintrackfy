"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

interface TransactionChartProps {
  className?: string
}

const data = [
  {
    name: "Jan",
    total: 12400,
    materials: 8400,
    labor: 3200,
    equipment: 800,
  },
  {
    name: "Feb",
    total: 15600,
    materials: 10200,
    labor: 4200,
    equipment: 1200,
  },
  {
    name: "Mar",
    total: 18900,
    materials: 12100,
    labor: 5200,
    equipment: 1600,
  },
  {
    name: "Apr",
    total: 22300,
    materials: 14500,
    labor: 6200,
    equipment: 1600,
  },
  {
    name: "May",
    total: 19800,
    materials: 12800,
    labor: 5500,
    equipment: 1500,
  },
  {
    name: "Jun",
    total: 25100,
    materials: 16300,
    labor: 7200,
    equipment: 1600,
  },
]

export function TransactionChart({ className }: TransactionChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          Breakdown of expenses by category over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="materials" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="labor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="equipment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              labelStyle={{ color: "#000" }}
              contentStyle={{ 
                backgroundColor: "white", 
                border: "1px solid #ccc",
                borderRadius: "8px"
              }}
            />
            <Area
              type="monotone"
              dataKey="materials"
              stackId="1"
              stroke="#8884d8"
              fill="url(#materials)"
            />
            <Area
              type="monotone"
              dataKey="labor"
              stackId="1"
              stroke="#82ca9d"
              fill="url(#labor)"
            />
            <Area
              type="monotone"
              dataKey="equipment"
              stackId="1"
              stroke="#ffc658"
              fill="url(#equipment)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}