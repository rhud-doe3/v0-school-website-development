import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all reviews
export async function GET(request: NextRequest) {
  try {
    const reviews = await prisma.review.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST new review
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const review = await prisma.review.create({
      data,
      include: { user: true },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}