"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectForm } from "@/components/projects/project-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Kitchen Remodel",
    description: "Complete kitchen renovation including cabinets, countertops, and appliances",
    budget: 25000,
    spent: 21250,
    progress: 85,
    status: "active",
    client: "Johnson Family",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    address: "123 Oak Street, Springfield"
  },
  {
    id: "2",
    name: "Bathroom Addition",
    description: "Adding a new master bathroom with walk-in shower and double vanity",
    budget: 18000,
    spent: 11160,
    progress: 62,
    status: "active",
    client: "Smith Residence", 
    startDate: "2024-01-15",
    endDate: "2024-04-01",
    address: "456 Pine Avenue, Springfield"
  },
  {
    id: "3",
    name: "Deck Installation",
    description: "Building a 20x16 composite deck with railings and stairs",
    budget: 12000,
    spent: 3600,
    progress: 30,
    status: "active",
    client: "Davis Home",
    startDate: "2024-02-01", 
    endDate: "2024-03-30",
    address: "789 Elm Drive, Springfield"
  },
  {
    id: "4",
    name: "Garage Conversion",
    description: "Converting 2-car garage into home office space",
    budget: 35000,
    spent: 35000,
    progress: 100,
    status: "completed",
    client: "Wilson Property",
    startDate: "2023-10-01",
    endDate: "2023-12-15",
    address: "321 Maple Court, Springfield"
  },
]

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(sampleProjects)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = projects.filter(project => {
    if (activeTab === "all") return true
    return project.status === activeTab
  })

  const handleCreateProject = (projectData: any) => {
    // In a real app, this would make an API call
    console.log("Creating project:", projectData)
    setIsCreateModalOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage your construction projects and track progress
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Icons.download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Icons.plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <ProjectForm
                  onSubmit={handleCreateProject}
                  onCancel={() => setIsCreateModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({projects.filter(p => p.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({projects.filter(p => p.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="on_hold">
              On Hold ({projects.filter(p => p.status === "on_hold").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Icons.building className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold">No projects found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by creating a new project.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}