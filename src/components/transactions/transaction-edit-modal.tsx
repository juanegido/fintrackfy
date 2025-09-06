"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"

interface Transaction {
  id: string
  date: string
  name: string
  amount: number
  category: string | null
  project: string | null
  status: "approved" | "pending" | "rejected"
  account: string
  isAiCategorized: boolean
}

interface TransactionEditModalProps {
  transaction: Transaction
  open: boolean
  onClose: () => void
  onSave: (transaction: Transaction) => void
}

export function TransactionEditModal({ 
  transaction, 
  open, 
  onClose, 
  onSave 
}: TransactionEditModalProps) {
  const [formData, setFormData] = useState({
    name: transaction.name,
    category: transaction.category || "",
    project: transaction.project || "",
    status: transaction.status,
    notes: "",
  })

  const handleSave = () => {
    onSave({
      ...transaction,
      name: formData.name,
      category: formData.category || null,
      project: formData.project || null,
      status: formData.status,
    })
  }

  const categories = [
    "Materials",
    "Subcontractor", 
    "Equipment",
    "Fuel",
    "Income",
    "Office Supplies",
    "Insurance",
    "Legal & Professional",
    "Other",
  ]

  const projects = [
    "Kitchen Remodel",
    "Bathroom Addition",
    "Deck Installation", 
    "Garage Conversion",
    "Basement Finish",
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Update the transaction details and categorization.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Transaction Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount:</span>
              <span className={`font-medium ${
                transaction.amount > 0 ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="text-sm">{new Date(transaction.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Account:</span>
              <span className="text-sm">{transaction.account}</span>
            </div>
            {transaction.isAiCategorized && (
              <div className="flex items-center space-x-1 text-blue-600">
                <Icons.check className="h-3 w-3" />
                <span className="text-xs">AI Categorized</span>
              </div>
            )}
          </div>

          {/* Editable Fields */}
          <div className="space-y-2">
            <Label htmlFor="name">Description</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select 
              value={formData.project} 
              onValueChange={(value) => setFormData({ ...formData, project: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Project</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: "approved" | "pending" | "rejected") => 
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}