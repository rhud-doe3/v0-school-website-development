import { NextResponse } from "next/server"

// In-memory storage for demo (in production, use a database)
let vacancies: Array<{
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  submittedAt: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const vacancy = {
      id: Date.now().toString(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      message: body.message,
      submittedAt: new Date().toLocaleString(),
    }
    
    vacancies.push(vacancy)
    
    console.log("[v0] New vacancy application:", vacancy)
    
    return NextResponse.json({ success: true, vacancy })
  } catch (error) {
    console.error("[v0] Vacancy error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ vacancies })
}
