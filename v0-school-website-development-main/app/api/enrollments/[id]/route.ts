import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single enrollment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: params.id },
      include: { user: true },
    });
    
    if (!enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Failed to fetch enrollment:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollment" },
      { status: 500 }
    );
  }
}

// PUT update enrollment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const enrollment = await prisma.enrollment.update({
      where: { id: params.id },
      data,
      include: { user: true },
    });
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Failed to update enrollment:", error);
    return NextResponse.json(
      { error: "Failed to update enrollment" },
      { status: 500 }
    );
  }
}

// DELETE enrollment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.enrollment.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete enrollment:", error);
    return NextResponse.json(
      { error: "Failed to delete enrollment" },
      { status: 500 }
    );
  }
}