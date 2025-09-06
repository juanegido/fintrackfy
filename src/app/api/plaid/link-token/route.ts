import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { plaidClient } from "@/lib/plaid"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { user_id } = await request.json()

    const linkTokenRequest = {
      user: {
        client_user_id: user_id || session.user.id,
      },
      client_name: "FinTrackfy Construction Finance",
      products: ['transactions' as const],
      country_codes: ['US' as const],
      language: 'en' as const,
      redirect_uri: process.env.PLAID_REDIRECT_URI,
    }

    const response = await plaidClient.linkTokenCreate(linkTokenRequest)
    
    return NextResponse.json({
      link_token: response.data.link_token,
      expiration: response.data.expiration,
    })
  } catch (error) {
    console.error("Error creating link token:", error)
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 }
    )
  }
}