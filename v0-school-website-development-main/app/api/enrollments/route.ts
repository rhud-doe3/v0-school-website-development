import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all enrollments
export async function GET(request: NextRequest) {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enrollments);
  } catch (error) {
    console.error("Failed to fetch enrollments:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}

// POST new enrollment
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const enrollment = await prisma.enrollment.create({
      data,
      include: { user: true },
    });
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error("Failed to create enrollment:", error);
    return NextResponse.json(
      { error: "Failed to create enrollment" },
      { status: 500 }
    );
  }
}