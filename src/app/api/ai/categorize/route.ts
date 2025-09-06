import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { categorizeTransaction } from "@/lib/ai-categorization"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { transactionId, transactionData } = await request.json()

    // If transactionId is provided, get transaction from database
    let transaction
    if (transactionId) {
      transaction = await db.transaction.findFirst({
        where: {
          id: transactionId,
          account: {
            userId: session.user.id
          }
        },
        include: {
          account: true
        }
      })

      if (!transaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
      }
    }

    // Use provided transaction data or database transaction
    const dataToAnalyze = transactionData || {
      name: transaction?.name,
      amount: transaction?.amount,
      merchantName: transaction?.merchantName,
      date: transaction?.date.toISOString(),
    }

    // Get AI categorization
    const prediction = await categorizeTransaction(dataToAnalyze)

    // If we have a transaction ID, update the database
    if (transactionId && transaction) {
      await db.transaction.update({
        where: { id: transactionId },
        data: {
          category: prediction.category,
          subcategory: prediction.subcategory,
          aiCategorized: true,
        }
      })
    }

    return NextResponse.json({
      success: true,
      prediction,
    })
  } catch (error) {
    console.error("AI categorization error:", error)
    return NextResponse.json(
      { error: "Failed to categorize transaction" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get uncategorized transactions for batch processing
    const uncategorizedTransactions = await db.transaction.findMany({
      where: {
        account: {
          userId: session.user.id
        },
        category: null,
        aiCategorized: false,
      },
      include: {
        account: true
      },
      take: 10, // Limit to avoid overwhelming the API
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      transactions: uncategorizedTransactions,
      count: uncategorizedTransactions.length,
    })
  } catch (error) {
    console.error("Error fetching uncategorized transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}