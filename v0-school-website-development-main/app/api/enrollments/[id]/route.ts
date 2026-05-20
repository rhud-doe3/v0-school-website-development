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

// GET single enrollment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("enrollment")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    const enrollment = {
      id: data.id,
      studentFullName: data.student_full_name,
      dateOfBirth: data.date_of_birth,
      studentAddress: data.student_address,
      parentGuardianName: data.parent_guardian_name,
      phoneNumber: data.phone_number,
      emailAddress: data.email_address,
      emergencyContact: data.emergency_contact,
      submittedAt: data.created_at,
    };

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
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("enrollment")
      .update({
        student_full_name: body.studentFullName,
        date_of_birth: body.dateOfBirth,
        student_address: body.studentAddress,
        parent_guardian_name: body.parentGuardianName,
        phone_number: body.phoneNumber,
        email_address: body.emailAddress,
        emergency_contact: body.emergencyContact,
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error || !data) throw error;

    const enrollment = {
      id: data.id,
      studentFullName: data.student_full_name,
      dateOfBirth: data.date_of_birth,
      studentAddress: data.student_address,
      parentGuardianName: data.parent_guardian_name,
      phoneNumber: data.phone_number,
      emailAddress: data.email_address,
      emergencyContact: data.emergency_contact,
      submittedAt: data.created_at,
    };

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
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("enrollment")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete enrollment:", error);
    return NextResponse.json(
      { error: "Failed to delete enrollment" },
      { status: 500 }
    );
  }
}
