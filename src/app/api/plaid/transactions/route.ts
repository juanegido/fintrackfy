import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { plaidClient } from "@/lib/plaid"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { subDays } from "date-fns"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { account_id, start_date, end_date } = await request.json()

    // Get account from database
    const account = await db.account.findFirst({
      where: {
        id: account_id,
        userId: session.user.id,
      },
    })

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    // Default to last 30 days if no date range provided
    const startDate = start_date || subDays(new Date(), 30)
    const endDate = end_date || new Date()

    // Fetch transactions from Plaid
    const transactionsResponse = await plaidClient.transactionsGet({
      access_token: account.plaidAccessToken,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    })

    const transactions = transactionsResponse.data.transactions
    const savedTransactions = []

    // Save new transactions to database
    for (const transaction of transactions) {
      try {
        // Check if transaction already exists
        const existingTransaction = await db.transaction.findUnique({
          where: { plaidTransactionId: transaction.transaction_id },
        })

        if (!existingTransaction) {
          const savedTransaction = await db.transaction.create({
            data: {
              accountId: account.id,
              plaidTransactionId: transaction.transaction_id,
              amount: transaction.amount,
              date: new Date(transaction.date),
              name: transaction.name,
              merchantName: transaction.merchant_name || null,
              category: transaction.category?.[0] || null,
              subcategory: transaction.category?.[1] || null,
            },
          })
          savedTransactions.push(savedTransaction)
        }
      } catch (error) {
        console.error(`Error saving transaction ${transaction.transaction_id}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      transactions: savedTransactions,
      total_transactions: transactions.length,
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}