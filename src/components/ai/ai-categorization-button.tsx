"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface AiCategorizationButtonProps {
  transactionId?: string
  onSuccess?: () => void
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

export function AiCategorizationButton({ 
  transactionId, 
  onSuccess,
  variant = "outline",
  size = "sm"
}: AiCategorizationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCategorize = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      })

      if (!response.ok) {
        throw new Error("Failed to categorize transaction")
      }

      const data = await response.json()
      
      toast({
        title: "AI Categorization Complete",
        description: `Categorized as: ${data.prediction.category} (${Math.round(data.prediction.confidence * 100)}% confidence)`,
      })

      onSuccess?.()
    } catch (error) {
      console.error("Categorization error:", error)
      toast({
        title: "Categorization Failed",
        description: "Unable to categorize transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCategorize}
      disabled={isLoading}
    >
      {isLoading ? (
        <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Icons.check className="h-4 w-4 mr-2" />
      )}
      AI Categorize
    </Button>
  )
}

export function BatchAiCategorizationButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [uncategorizedCount, setUncategorizedCount] = useState<number | null>(null)
  const { toast } = useToast()

  const fetchUncategorizedCount = async () => {
    try {
      const response = await fetch("/api/ai/categorize")
      if (response.ok) {
        const data = await response.json()
        setUncategorizedCount(data.count)
      }
    } catch (error) {
      console.error("Error fetching count:", error)
    }
  }

  const handleBatchCategorize = async () => {
    setIsLoading(true)
    try {
      // First get uncategorized transactions
      const response = await fetch("/api/ai/categorize")
      const data = await response.json()
      
      if (!data.transactions?.length) {
        toast({
          title: "No Transactions",
          description: "No uncategorized transactions found.",
        })
        return
      }

      // Process each transaction
      let successCount = 0
      let errorCount = 0

      for (const transaction of data.transactions) {
        try {
          const categorizeResponse = await fetch("/api/ai/categorize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transactionId: transaction.id }),
          })

          if (categorizeResponse.ok) {
            successCount++
          } else {
            errorCount++
          }
        } catch (error) {
          errorCount++
        }
      }

      toast({
        title: "Batch Categorization Complete",
        description: `Successfully categorized ${successCount} transactions. ${errorCount} failed.`,
      })

      setUncategorizedCount(0)
    } catch (error) {
      console.error("Batch categorization error:", error)
      toast({
        title: "Batch Categorization Failed",
        description: "Unable to process transactions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch count on mount
  useState(() => {
    fetchUncategorizedCount()
  })

  if (uncategorizedCount === null) return null

  return (
    <div className="flex items-center space-x-2">
      {uncategorizedCount > 0 && (
        <Badge variant="secondary">
          {uncategorizedCount} uncategorized
        </Badge>
      )}
      <Button
        variant="outline"
        onClick={handleBatchCategorize}
        disabled={isLoading || uncategorizedCount === 0}
      >
        {isLoading ? (
          <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Icons.check className="h-4 w-4 mr-2" />
        )}
        AI Categorize All
      </Button>
    </div>
  )
}