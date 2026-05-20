import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client inside handlers to avoid build-time initialization
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!url || !key) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(url, key);
}

// GET single review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("vacancy")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    const review = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      message: data.message,
      submittedAt: data.created_at,
    };

    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to fetch review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

// PUT update review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("vacancy")
      .update({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        message: body.message,
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error || !data) throw error;

    const review = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      message: data.message,
      submittedAt: data.created_at,
    };

    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to update review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("vacancy")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Failed to delete review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
