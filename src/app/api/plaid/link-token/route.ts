import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { plaidClient } from "@/lib/plaid"
import { authOptions } from "@/lib/auth"
import { CountryCode, Products } from "plaid"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { user_id } = await request.json()

    const linkTokenRequest = {
      user: {
        client_user_id: user_id || (session.user as any).id,
      },
      client_name: "FinTrackfy Construction Finance",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en' as const,
    }

    const response = await plaidClient.linkTokenCreate(linkTokenRequest)
    
    return NextResponse.json({
      link_token: response.data.link_token,
      expiration: response.data.expiration,
    })
  } catch (error: any) {
    console.error("Error creating link token:", error)
    
    // Log the detailed error response from Plaid
    if (error.response?.data) {
      console.error("Plaid error details:", JSON.stringify(error.response.data, null, 2))
    }
    if (error.response?.status) {
      console.error("Plaid error status:", error.response.status)
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create link token",
        details: error.response?.data || error.message
      },
      { status: 500 }
    )
  }
}