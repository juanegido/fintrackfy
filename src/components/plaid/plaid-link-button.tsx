"use client"

import { useCallback, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"

interface PlaidLinkButtonProps {
  onSuccess?: () => void
  className?: string
}

export function PlaidLinkButton({ onSuccess, className }: PlaidLinkButtonProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const createLinkToken = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/plaid/link-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error("Failed to create link token")
      }

      const data = await response.json()
      setLinkToken(data.link_token)
      return data.link_token
    } catch (error) {
      console.error("Error creating link token:", error)
      toast({
        title: "Error",
        description: "Failed to initialize bank connection. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const onPlaidSuccess = useCallback(async (publicToken: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken }),
      })

      if (!response.ok) {
        throw new Error("Failed to exchange token")
      }

      const data = await response.json()
      
      toast({
        title: "Success!",
        description: `Connected ${data.accounts.length} account(s) successfully.`,
      })

      onSuccess?.()
    } catch (error) {
      console.error("Error exchanging token:", error)
      toast({
        title: "Error",
        description: "Failed to connect bank account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast, onSuccess])

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
    onEvent: (eventName, metadata) => {
      console.log("Plaid event:", eventName, metadata)
    },
    onExit: (err, metadata) => {
      console.log("Plaid exit:", err, metadata)
    },
  })

  const handleClick = async () => {
    if (!linkToken) {
      const token = await createLinkToken()
      if (token) {
        setTimeout(() => open(), 100)
      }
    } else {
      open()
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={!ready || isLoading}
      className={className}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.card className="mr-2 h-4 w-4" />
      )}
      Connect Bank Account
    </Button>
  )
}