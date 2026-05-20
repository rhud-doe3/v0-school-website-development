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

// GET all reviews/vacancies
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("vacancy")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform data to match expected format
    const reviews = (data || []).map((record: any) => ({
      id: record.id,
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      message: record.message,
      submittedAt: record.created_at,
    }));

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
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("vacancy")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          message: body.message,
        },
      ])
      .select();

    if (error) throw error;

    // Transform response to match expected format
    const review = {
      id: data?.[0]?.id,
      firstName: data?.[0]?.first_name,
      lastName: data?.[0]?.last_name,
      email: data?.[0]?.email,
      message: data?.[0]?.message,
      submittedAt: data?.[0]?.created_at,
    };

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
