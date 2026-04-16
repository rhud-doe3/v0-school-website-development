import { NextResponse } from "next/server"

// In-memory storage for demo (in production, use a database)
let enrollments: Array<{
  id: string
  studentFullName: string
  dateOfBirth: string
  studentAddress: string
  parentGuardianName: string
  phoneNumber: string
  emailAddress: string
  emergencyContact: string
  submittedAt: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const enrollment = {
      id: Date.now().toString(),
      studentFullName: body.studentFullName,
      dateOfBirth: body.dateOfBirth,
      studentAddress: body.studentAddress,
      parentGuardianName: body.parentGuardianName,
      phoneNumber: body.phoneNumber,
      emailAddress: body.emailAddress,
      emergencyContact: body.emergencyContact,
      submittedAt: new Date().toLocaleString(),
    }
    
    enrollments.push(enrollment)
    
    console.log("[v0] New enrollment submission:", enrollment)
    
    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error("[v0] Enrollment error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit enrollment" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ enrollments })
}
