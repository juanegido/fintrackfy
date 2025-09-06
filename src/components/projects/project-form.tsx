"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/ui/icons"

interface ProjectFormData {
  name: string
  description: string
  client: string
  address: string
  budget: string
  startDate: string
  endDate: string
  status: "active" | "on_hold"
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void
  onCancel: () => void
  initialData?: Partial<ProjectFormData>
}

export function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    client: initialData?.client || "",
    address: initialData?.address || "",
    budget: initialData?.budget || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    status: initialData?.status || "active",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim() || !formData.client.trim() || !formData.budget.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Name */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Project Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g., Kitchen Remodel, Bathroom Addition"
            required
          />
        </div>

        {/* Client */}
        <div className="space-y-2">
          <Label htmlFor="client">Client *</Label>
          <Input
            id="client"
            value={formData.client}
            onChange={(e) => updateField("client", e.target.value)}
            placeholder="Client name"
            required
          />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget *</Label>
          <div className="relative">
            <Icons.dollar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              placeholder="25000"
              className="pl-8"
              required
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDate">Target End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Project Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="123 Main Street, City, State"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value: "active" | "on_hold") => updateField("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Brief description of the project scope and requirements..."
            rows={3}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.plus className="mr-2 h-4 w-4" />
          )}
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}