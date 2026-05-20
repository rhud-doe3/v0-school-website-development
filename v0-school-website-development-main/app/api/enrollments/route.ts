import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET all enrollments
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("enrollment")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform data to match expected format
    const enrollments = (data || []).map((record: any) => ({
      id: record.id,
      studentFullName: record.student_full_name,
      dateOfBirth: record.date_of_birth,
      studentAddress: record.student_address,
      parentGuardianName: record.parent_guardian_name,
      phoneNumber: record.phone_number,
      emailAddress: record.email_address,
      emergencyContact: record.emergency_contact,
      submittedAt: record.created_at,
    }));

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
    const body = await request.json();

    const { data, error } = await supabase
      .from("enrollment")
      .insert([
        {
          student_full_name: body.studentFullName,
          date_of_birth: body.dateOfBirth,
          student_address: body.studentAddress,
          parent_guardian_name: body.parentGuardianName,
          phone_number: body.phoneNumber,
          email_address: body.emailAddress,
          emergency_contact: body.emergencyContact,
        },
      ])
      .select();

    if (error) throw error;

    // Transform response to match expected format
    const enrollment = {
      id: data?.[0]?.id,
      studentFullName: data?.[0]?.student_full_name,
      dateOfBirth: data?.[0]?.date_of_birth,
      studentAddress: data?.[0]?.student_address,
      parentGuardianName: data?.[0]?.parent_guardian_name,
      phoneNumber: data?.[0]?.phone_number,
      emailAddress: data?.[0]?.email_address,
      emergencyContact: data?.[0]?.emergency_contact,
      submittedAt: data?.[0]?.created_at,
    };

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error("Failed to create enrollment:", error);
    return NextResponse.json(
      { error: "Failed to create enrollment" },
      { status: 500 }
    );
  }
}
