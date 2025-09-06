import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { plaidClient } from "@/lib/plaid"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { public_token } = await request.json()

    // Exchange public token for access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    })

    const accessToken = exchangeResponse.data.access_token
    const itemId = exchangeResponse.data.item_id

    // Get accounts information
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    })

    // Store accounts in database
    const accounts = accountsResponse.data.accounts
    const savedAccounts = []

    for (const account of accounts) {
      try {
        const savedAccount = await db.account.create({
          data: {
            userId: session.user.id,
            plaidAccountId: account.account_id,
            plaidItemId: itemId,
            plaidAccessToken: accessToken,
            name: account.name,
            type: account.type,
            subtype: account.subtype || '',
            mask: account.mask || '',
            balance: account.balances.current || 0,
          },
        })
        savedAccounts.push(savedAccount)
      } catch (error) {
        console.error(`Error saving account ${account.account_id}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      accounts: savedAccounts,
    })
  } catch (error) {
    console.error("Error exchanging token:", error)
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    )
  }
}