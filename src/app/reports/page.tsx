"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ReportCard } from "@/components/reports/report-card"
import { ExpenseReport } from "@/components/reports/expense-report"
import { ProjectReport } from "@/components/reports/project-report"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/ui/icons"

export default function ReportsPage() {
  const handleExportReport = (type: string) => {
    // In a real app, this would generate and download the report
    console.log(`Exporting ${type} report`)
  }

  const reportCards = [
    {
      title: "Monthly Expense Report",
      description: "Detailed breakdown of expenses by category and project",
      lastGenerated: "2024-01-15",
      icon: Icons.receipt,
      onExport: () => handleExportReport("monthly-expense"),
    },
    {
      title: "Project Financial Summary", 
      description: "Budget vs actual spending for all active projects",
      lastGenerated: "2024-01-15",
      icon: Icons.building,
      onExport: () => handleExportReport("project-financial"),
    },
    {
      title: "Tax Preparation Report",
      description: "Categorized expenses ready for tax filing",
      lastGenerated: "2024-01-10",
      icon: Icons.fileText,
      onExport: () => handleExportReport("tax-prep"),
    },
    {
      title: "Cash Flow Analysis",
      description: "Income vs expenses and cash flow projections",
      lastGenerated: "2024-01-14",
      icon: Icons.chart,
      onExport: () => handleExportReport("cash-flow"),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate financial reports and analytics for your construction business
            </p>
          </div>
          <Button variant="outline">
            <Icons.settings className="mr-2 h-4 w-4" />
            Report Settings
          </Button>
        </div>

        {/* Report Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reportCards.map((report, index) => (
            <ReportCard key={index} {...report} />
          ))}
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="expense" className="space-y-4">
          <TabsList>
            <TabsTrigger value="expense">Expense Analysis</TabsTrigger>
            <TabsTrigger value="project">Project Reports</TabsTrigger>
            <TabsTrigger value="tax">Tax Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="expense" className="space-y-4">
            <ExpenseReport />
          </TabsContent>

          <TabsContent value="project" className="space-y-4">
            <ProjectReport />
          </TabsContent>

          <TabsContent value="tax" className="space-y-4">
            <div className="text-center py-12">
              <Icons.fileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">Tax Reports</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Generate tax-ready expense categorizations and summaries.
              </p>
              <div className="mt-6">
                <Button onClick={() => handleExportReport("tax-summary")}>
                  <Icons.download className="mr-2 h-4 w-4" />
                  Generate Tax Report
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="text-center py-12">
              <Icons.chart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">Custom Reports</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create custom reports with specific date ranges and filters.
              </p>
              <div className="mt-6">
                <Button>
                  <Icons.plus className="mr-2 h-4 w-4" />
                  Create Custom Report
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}