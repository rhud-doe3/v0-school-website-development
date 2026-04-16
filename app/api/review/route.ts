import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // In a real application, you would save this to a database
    // For now, we'll return success and let the client handle localStorage
    const reviewRecord = {
      id: `review_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject,
      message: data.message,
      rating: data.rating || 5,
      submittedAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    return NextResponse.json({ 
      success: true, 
      message: "Review submitted successfully",
      data: reviewRecord
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    )
  }
}
